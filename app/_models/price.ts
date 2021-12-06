import type { Price } from ".prisma/client";

export type PriceApi = {
  [key: string]: {
    NOK_per_kWh: number;
    valid_from: string;
    valid_to: string;
  };
};

export type PriceView = {
  area: string;
  date: string;
  prices: Price[];
};
