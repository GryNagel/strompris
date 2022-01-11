import type { LoaderFunction, MetaFunction } from 'remix';
import { useCatch, useLoaderData } from 'remix';
import type { Price } from '@prisma/client';

import PriceChart from '../../components/PriceChart';
import { calculateAveragePrice, getPricesForArea } from '../../_utils/price.server';
import { areas } from '../../_constants';
import { getApiDates } from '../../_utils/date.server';

type LoaderData = {
    today: Price[] | null;
    tomorrow?: Price[] | null;
    areaName: string | undefined;
    averagePriceToday: number;
    averagePriceTomorrow: number | null;
};

export const meta: MetaFunction = ({ params }) => {
    return {
        title: `Strømpriser - ${areas.find((item) => item.number === params.area)?.title}`,
    };
};

export let loader: LoaderFunction = async ({ params }): Promise<LoaderData | null> => {
    if (!params.area || areas.find((item) => item.number === params.area) === undefined) {
        throw new Response(`Område "${params.area}" eksisterer ikke`, {
            status: 404,
        });
    }

    const { today, tomorrow } = getApiDates();

    let todayRes = await getPricesForArea(params.area, today);
    const isTomorrow = true;
    let tomorrowRes = await getPricesForArea(params.area, tomorrow, isTomorrow);

    if (!todayRes?.prices) {
        throw new Response('Ingen priser for i dag funnet 😢', {
            status: 404,
        });
    }

    return {
        today: todayRes.prices || null,
        tomorrow: tomorrowRes?.prices || null,
        averagePriceToday: calculateAveragePrice(todayRes?.prices),
        averagePriceTomorrow: tomorrowRes ? calculateAveragePrice(tomorrowRes.prices) : null,
        areaName: areas.find((item) => item.number === params.area)?.title,
    };
};

export default function PriceRoute() {
    let data = useLoaderData<LoaderData>();

    return (
        <div>
            <div className="price-chart">
                {data.today && (
                    <PriceChart
                        today={data.today}
                        tomorrow={data.tomorrow || []}
                        areaName={data.areaName}
                    />
                )}
            </div>
            <div className="surcharge">
                <div className="average">
                    <h2>Dagens gjennomsnittspris for {data.areaName}:</h2>
                    <p className="average-price">
                        {data.averagePriceToday} <span className="average-suffix">NOK/kWh</span>
                    </p>
                </div>
                {data.averagePriceTomorrow && (
                    <div className="average">
                        <h2>Morgendagens gjennomsnittspris for {data.areaName}:</h2>
                        <p className="average-price">
                            {data.averagePriceTomorrow}
                            <span className="average-suffix">NOK/kWh</span>
                            {data.averagePriceToday > data.averagePriceTomorrow ? '▼' : '▲'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export function CatchBoundary() {
    const caught = useCatch();

    if (caught.status === 404) {
        return <div className="error-container">{caught.data}</div>;
    }
    throw new Error(`Her har det skjedd noe rart: ${caught.status}`);
}
