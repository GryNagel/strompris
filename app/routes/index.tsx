import { Link, useLoaderData } from '@remix-run/react';
import { addHours, isBefore, set, setMinutes } from 'date-fns';
import type { LinksFunction } from '@remix-run/react/dist/routeModules';
import type { HeadersFunction, LoaderFunction } from '@remix-run/node';

import { createViewTime, getHours } from '../utils/date';
import Footer from '../components/Footer';
import Header from '../components/Header';

import indexStylesUrl from '~/styles/index.css';
import type { AveragePrices } from '~/types';
import { areas, getEntries, getKeys } from '~/types';
import { getTodaysPrices } from '~/server/api.server';
import { getAveragePrice } from '~/server/average.server';
import AllPricesChart from '~/components/AllPricesChart';

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: indexStylesUrl }];
};

function getCacheExpiry() {
  const now = new Date();
  const noon = set(now, { hours: 11, minutes: 59 });
  const midnight = set(now, { hours: 23, minutes: 59 });
  if (isBefore(now, noon)) {
    return noon;
  }
  return midnight;
}

export const headers: HeadersFunction = () => {
  return {
    'cache-control': 'public',
    Expires: getCacheExpiry().toISOString(),
  };
};

type LoaderData = {
  prices: Awaited<ReturnType<typeof getTodaysPrices>>;
  averagePrices: AveragePrices;
};

export const loader: LoaderFunction = async () => {
  const prices = await getTodaysPrices();

  const averagePrices = getEntries(prices.priceByHour.pricesObj).reduce((acc, [key, value]) => {
    acc[key] = getAveragePrice(value);
    return acc;
  }, {} as AveragePrices);

  return { prices, averagePrices };
};

export default function IndexRoute() {
  const { prices, averagePrices } = useLoaderData() as LoaderData;

  return (
    <div>
      <Header />
      <div className="container">
        <h2 className="price-header">
          Strømprisen her og nå i øre/kWh ({createViewTime(setMinutes(new Date(), 0))} -{' '}
          {createViewTime(addHours(setMinutes(new Date(), 0), 1))}):
        </h2>
        <nav>
          <ul className="navigation-list">
            {getKeys(prices.price).map((key) => (
              <Link
                to={`/price/${areas[key].number}`}
                key={key}
                className={`navigation-link link-${areas[key].number}`}
                style={{
                  borderBottom: `20px solid var(--chart-${areas[key].number})`,
                  borderTop: `20px solid var(--chart-${areas[key].number})`,
                }}
              >
                <li className="navigation-item">
                  <h2 className="header">{areas[key].title}</h2>
                  <p className="price">{prices.priceByHour.pricesObj[key][getHours()]}</p>
                  <p>
                    Dagens gjennomsnitt: <br />
                    <strong>{averagePrices[key]}</strong>
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        <AllPricesChart data={averagePrices} />
      </div>
      <Footer />
    </div>
  );
}
