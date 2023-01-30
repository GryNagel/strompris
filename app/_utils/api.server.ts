import { createApiDate } from './date';

import type { Prices } from '~/_models';
import { PricesSchema } from '~/_models';

const apiUrl = 'https://redutv-api.vg.no/power-data/v2/nordpool/price-by-date';

export default async function fetchPrices(): Promise<Prices> {
    const todaysDate = new Date();
    const today = createApiDate(todaysDate);
    try {
        const res = await fetch(`${apiUrl}/${today}`);

        if (res.ok) {
            const data = await res.json();
            console.log('ok?', data);
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
