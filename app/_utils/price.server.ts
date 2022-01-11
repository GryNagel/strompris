import { format, set, isAfter } from 'date-fns';

import { apiDateFormat, areas } from '../_constants';
import type { PriceApi, PriceView } from '../_models';
import { db } from './db.server';

import type { Price } from '.prisma/client';

type NewPrice = Pick<Price, 'price' | 'validTo' | 'validFrom'>;

function calculatePrices(prices: PriceApi | null): NewPrice[] {
    if (!prices) {
        return [];
    }

    return Object.entries(prices as PriceApi).map(([, value]) => ({
        price: value.NOK_per_kWh,
        validTo: value.valid_to.toString(),
        validFrom: value.valid_from.toString(),
    }));
}

async function fetchDate(date: string, area: string): Promise<PriceApi | null> {
    const dateToFetch = format(new Date(date), apiDateFormat);

    try {
        let res = await fetch(
            `https://norway-power.ffail.win/?zone=NO${area}&date=${dateToFetch}&key=abcd`
        );

        return (await res.json()) as PriceApi;
    } catch {
        return null;
    }
}

async function getPriceDataByArea(area: string, date: string): Promise<NewPrice[]> {
    let res = await fetchDate(date, area);

    return calculatePrices(res);
}

async function findStoredPrices(number: string, date: string): Promise<PriceView | null> {
    let apiDate = format(new Date(date), apiDateFormat);
    let item = await db.prices.findFirst({
        where: { area: number, apiDate: apiDate },
        select: { area: true, date: true, prices: true },
    });

    if (!item) {
        return null;
    }
    return item;
}

async function createNewPrices(area: string, date: string) {
    console.log('Creating new prices for', area, date);
    let currentLock = await db.lock.findFirst({ where: { lockDate: date, area } });

    if (currentLock) {
        throw new Error(
            'Lock already exists, data fetching is in progress, please try again later'
        );
    }

    let lock = await db.lock.create({
        data: { area, lockDate: date },
    });

    const res = await getPriceDataByArea(area, date);
    await db.prices.create({
        data: { area, date: date, apiDate: format(new Date(date), apiDateFormat) },
    });

    const priceObject = await db.prices.findFirst({
        where: { area, date: date },
    });

    await Promise.all(
        res.map(
            async (item) =>
                await db.price.create({
                    data: { ...item, pricesId: priceObject?.id },
                })
        )
    );

    await db.lock.delete({
        where: { id: lock.id },
    });
}

export async function getPriceDataForAllZones(date: string): Promise<any> {
    return await Promise.all(
        areas.map(async ({ number: area }) => {
            try {
                let storedPrices = await findStoredPrices(area, date);
                if (!storedPrices) {
                    throw new Error('need to fetch them');
                }
                return storedPrices;
            } catch {
                await createNewPrices(area, date);
                return await findStoredPrices(area, date);
            }
        })
    );
}

export async function getPricesForArea(
    area: string,
    date: string,
    isTomorrow?: boolean
): Promise<PriceView | null> {
    const today = new Date();
    const updateDateTime = set(today, { hours: 15, minutes: 0 });
    const checkForTomorrow = isAfter(today, updateDateTime);

    if (!checkForTomorrow) {
        throw new Error('No prices for tomorrow');
    }

    try {
        let storedPrices = await findStoredPrices(area, date);
        if (!storedPrices) {
            throw new Error('no prices');
        }
        return storedPrices;
    } catch {
        await createNewPrices(area, date);
        return await findStoredPrices(area, date);
    }
}

export function calculateAveragePrice(prices: Price[] | null): number {
    if (!prices) {
        return 0;
    }

    return (
        Math.round(
            (prices.reduce((acc, currentItem) => {
                acc += currentItem.price;
                return acc;
            }, 0) /
                prices.length +
                Number.EPSILON) *
                10000
        ) / 10000
    );
}
