import { z } from 'zod';

export const CurrentPriceSchema = z.object({
  oslo: z.number(),
  kristiansand: z.number(),
  bergen: z.number(),
  trondheim: z.number(),
  tromso: z.number(),
});

export const PriceByHourSchema = z.object({
  oslo: z.array(z.number()),
  kristiansand: z.array(z.number()),
  bergen: z.array(z.number()),
  trondheim: z.array(z.number()),
  tromso: z.array(z.number()),
});

export const PricesSchema = z.object({
  date: z.string(),
  price: CurrentPriceSchema,
  priceByHour: z.object({
    date: z.string(),
    hours: z.array(z.string()),
    pricesObj: PriceByHourSchema,
  }),
});

export type Prices = z.infer<typeof PricesSchema>;
export type PriceByHour = z.infer<typeof PriceByHourSchema>;
export type CurrentPrice = z.infer<typeof CurrentPriceSchema>;
export type Cities = keyof PriceByHour;

export type AveragePrices = Record<Cities, number>;
