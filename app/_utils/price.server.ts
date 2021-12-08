import { format } from 'date-fns';

import { apiDateFormat, Areas } from '../_constants';
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
        let res = await fetch(`https://norway-power.ffail.win/?zone=NO${area}&date=${dateToFetch}`);

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
    const item = await db.prices.findFirst({
        where: { area: number, date: date },
        select: { area: true, date: true, prices: true },
    });

    if (!item) {
        return null;
    }
    return item;
}

async function createNewPrices(number: string, date: string) {
    const res = await getPriceDataByArea(number, date);
    await db.prices.create({
        data: { area: number, date: date },
    });

    const priceObject = await db.prices.findFirst({
        where: { area: number, date: date },
    });

    await Promise.all(
        res.map(
            async (item) =>
                await db.price.create({
                    data: { ...item, pricesId: priceObject?.id },
                })
        )
    );
}

export async function getPriceDataForAllZones(date: string): Promise<any> {
    return await Promise.all(
        Areas.map(async ({ number }) => {
            try {
                let storedPrices = await findStoredPrices(number, date);
                if (!storedPrices) {
                    throw new Error('need to fetch them');
                }
                return storedPrices;
            } catch {
                await createNewPrices(number, date);
                return await findStoredPrices(number, date);
            }
        })
    );
}

export async function getPricesForArea(area: string, date: string): Promise<PriceView | null> {
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

export function calculateAveragePrice(prices: Price[]): number {
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
