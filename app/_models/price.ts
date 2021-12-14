export type PriceApi = {
    [key: string]: {
        NOK_per_kWh: number;
        valid_from: string;
        valid_to: string;
    };
};

export type Price = {
    validTo: string;
    validFrom: string;
    price: number;
};

export type PriceView = {
    area: string;
    date: string;
    prices: Price[];
};
