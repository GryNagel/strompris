import type {
    HandleDocumentRequestFunction,
    HeadersFunction,
    LinksFunction,
    LoaderFunction,
} from 'remix';
import { useLoaderData } from 'remix';
import { Link } from 'remix';
import { addHours, setMinutes } from 'date-fns';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { createViewTime, getHours } from '../_utils/date';

import indexStylesUrl from '~/styles/index.css';
import type { PriceByHour, Prices } from '~/_models';
import fetchPrices from '~/_utils/api.server';
import { areas } from '~/_constants';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: indexStylesUrl }];
};

export const headers: HeadersFunction = (request) => {
    return {
        'cache-control': 'max-age=10',
    };
};

type LoaderData = {
    prices: Prices;
    averagePrices: PriceByHour;
};

function getAveragePrice(prices: number[]): number {
    const total = prices.reduce((acc, currentItem) => (acc += currentItem), 0);
    const average = total / prices.length;
    console.log(prices, total, average, prices.length);
    return Math.round(average);
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
    console.log('hey');
    const prices = await fetchPrices();
    const averagePrices = Object.entries(prices.priceByHour.pricesObj).reduce(
        (acc, [key, value]) => {
            acc[key] = getAveragePrice(value);
            return acc;
        },
        {} as PriceByHour
    );

    return { prices, averagePrices };
};

export default function IndexRoute() {
    const { prices, averagePrices } = useLoaderData<LoaderData>();

    console.log(prices.price);

    return (
        <div>
            <Header />
            <div className="container">
                <h2 className="price-header">
                    Strømprisen her og nå ({createViewTime(setMinutes(new Date(), 0))} -{' '}
                    {createViewTime(addHours(setMinutes(new Date(), 0), 1))}):
                </h2>
                <nav>
                    <ul className="navigation-list">
                        {Object.entries(prices.price).map(([area, price]) => (
                            <Link
                                to={`/price/${areas[area].number}`}
                                key={area}
                                className={`navigation-link link-${areas[area].number}`}
                                style={{
                                    borderBottom: `20px solid var(--chart-${areas[area].number})`,
                                    borderTop: `20px solid var(--chart-${areas[area].number})`,
                                }}
                            >
                                <li className="navigation-item">
                                    <h2 className="header">{areas[area].title}</h2>
                                    <p className="price">
                                        {prices.priceByHour.pricesObj[area][getHours()]}
                                    </p>
                                    <p>Gjennomsnitt: {averagePrices[area]}</p>
                                    <p className="explanation">Øre/kWh</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                </nav>
            </div>
            <Footer />
        </div>
    );
}
