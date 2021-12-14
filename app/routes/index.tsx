import type { LinksFunction, LoaderFunction } from 'remix';
import { useLoaderData } from 'remix';
import { Link } from 'remix';
import { addHours, setMinutes } from 'date-fns';

import { areas } from '../_constants';
import Header from '../components/Header';
import { getPriceDataForAllZones } from '../_utils/price.server';
import Footer from '../components/Footer';
import AllPricesChart from '../components/AllPricesChart';
import { createIsoDate, createViewTime } from '../_utils/date';

import indexStylesUrl from '~/styles/index.css';
import type { Price } from '.prisma/client';

export let links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: indexStylesUrl }];
};

type LoaderData = {
    prices: { area: string; date: string; prices: Price[] }[];
};

export let loader: LoaderFunction = async (): Promise<LoaderData> => {
    const date = createIsoDate(new Date());
    let prices = await getPriceDataForAllZones(date);

    return { prices };
};

export default function IndexRoute() {
    const data = useLoaderData<LoaderData>();
    const now = createIsoDate(new Date());

    return (
        <div>
            <Header />
            <div className="container">
                <h2 className="price-header">
                    Strømprisen her og nå ({createViewTime(setMinutes(new Date(), 0))} -{' '}
                    {createViewTime(addHours(setMinutes(new Date(), 0), 1))}):
                </h2>
                <ul role="navigation" className="navigation-list">
                    {data.prices.map((item) => (
                        <Link
                            to={`/price/${item.area}`}
                            key={item.area}
                            className={`navigation-link link-${item.area}`}
                            style={{
                                borderBottom: `20px solid var(--chart-${item.area})`,
                                borderTop: `20px solid var(--chart-${item.area})`,
                            }}
                        >
                            <li className="navigation-item">
                                <h2 className="header">
                                    {areas.find((area) => area.number === item.area)?.title}
                                </h2>
                                <p className="price">
                                    {
                                        item.prices.find(
                                            (item) =>
                                                createViewTime(item.validFrom) ===
                                                createViewTime(now)
                                        )?.price
                                    }
                                </p>
                                <p className="explanation">NOK/kWh</p>
                            </li>
                        </Link>
                    ))}
                </ul>
                <div className="all-prices-chart">
                    <AllPricesChart data={data.prices} />
                </div>
            </div>
            <Footer />
        </div>
    );
}
