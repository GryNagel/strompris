import { format } from 'date-fns';

import { apiDateFormat, areas } from '../_constants';
import type { Price, PriceApi } from '../_models';

function calculatePrices(prices: PriceApi | null): Price[] {
    if (!prices) {
        return [];
    }

    return Object.entries(prices as PriceApi).map(([, value]) => ({
        price: value.NOK_per_kWh,
        validTo: value.valid_to.toString(),
        validFrom: value.valid_from.toString(),
    }));
}

async function fetchPricesByDateAndArea(date: string, area: string): Promise<PriceApi | null> {
    const dateToFetch = format(new Date(date), apiDateFormat);

    try {
        let res = await fetch(`https://norway-power.ffail.win/?zone=NO${area}&date=${dateToFetch}`);

        return (await res.json()) as PriceApi;
    } catch {
        return null;
    }
}

export async function getPriceDataByArea(area: string, date: string): Promise<Price[] | null> {
    try {
        let res = await fetchPricesByDateAndArea(date, area);
        return calculatePrices(res);
    } catch {
        return null;
    }
}

export async function getPriceDataForAllZones(date: string): Promise<any> {
    const prices = await Promise.all(
        areas.map(async ({ number }) => {
            try {
                let res = await fetchPricesByDateAndArea(date, number);
                return { area: number, date: date, prices: calculatePrices(res) };
            } catch {
                return null;
            }
        })
    );
    return prices;
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
