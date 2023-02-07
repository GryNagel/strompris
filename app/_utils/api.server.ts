import { isAfter, set, addDays } from 'date-fns';

import { createApiDate } from './date';

import type { Prices } from '~/_models';
import { PricesSchema } from '~/_models';

const apiUrl = 'https://redutv-api.vg.no/power-data/v2/nordpool/price-by-date';

export default async function fetchPrices(date: string): Promise<Prices> {
    try {
        const res = await fetch(`${apiUrl}/${date}`);

        console.log(res.headers, res.status);

        if (res.ok) {
            const data = await res.json();
            const parsed = PricesSchema.safeParse(data);
            if (parsed.success) {
                return parsed?.data;
            } else {
                throw parsed?.error;
            }
        } else {
            throw new Error('Uh ohw');
        }
    } catch (error) {
        throw error;
    }
}

export async function getTodaysPrices() {
    const todaysDate = new Date();
    const today = createApiDate(todaysDate);

    return await fetchPrices(today);
}

export async function getTomorrowsPrices() {
    const today = new Date();
    const updateDateTime = set(today, { hours: 13, minutes: 0 });
    const checkForTomorrow = isAfter(today, updateDateTime);

    if (checkForTomorrow) {
        return null;
    }

    const tomorrow = createApiDate(addDays(today, 1));

    return await fetchPrices(tomorrow);
}
