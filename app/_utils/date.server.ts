import { addDays } from 'date-fns';

import { createIsoDate } from './date';

export function getApiDates() {
    const todaysDate = new Date();
    const today = createIsoDate(todaysDate);
    const tomorrow = createIsoDate(addDays(todaysDate, 1));
    return { today, tomorrow };
}
