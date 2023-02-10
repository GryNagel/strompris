import { Link, Outlet, useLoaderData, useParams } from '@remix-run/react';
import { addHours, isBefore, set, setMinutes } from 'date-fns';
import type { LinksFunction } from '@remix-run/react/dist/routeModules';
import type { HeadersFunction, LoaderFunction } from '@remix-run/node';

import { createViewTime, getHours } from '../utils/date';
import Footer from '../components/Footer';
import Header from '../components/Header';

import indexStylesUrl from '~/styles/index.css';
import type { AveragePrices } from '~/types';
import { areas, getEntries, getKeys } from '~/types';
import { getTodaysPrices, getTomorrowsPrices } from '~/server/api.server';
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
  today: Awaited<ReturnType<typeof getTodaysPrices>>;
  tomorrow: Awaited<ReturnType<typeof getTomorrowsPrices>>;
  todaysAveragePrices: AveragePrices;
  tomorrowsAveragePrices: AveragePrices | null;
};

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const today = await getTodaysPrices();
  const tomorrow = await getTomorrowsPrices();

  const todaysAveragePrices = getEntries(today.priceByHour.pricesObj).reduce(
    (acc, [key, value]) => {
      acc[key] = getAveragePrice(value);
      return acc;
    },
    {} as AveragePrices
  );

  const tomorrowsAveragePrices = tomorrow
    ? getEntries(tomorrow.priceByHour.pricesObj).reduce((acc, [key, value]) => {
        acc[key] = getAveragePrice(value);
        return acc;
      }, {} as AveragePrices)
    : null;

  return {
    today,
    tomorrow,
    todaysAveragePrices,
    tomorrowsAveragePrices,
  };
};

export default function IndexRoute() {
  const { today, todaysAveragePrices, tomorrowsAveragePrices } = useLoaderData() as LoaderData;
  const { areaId } = useParams<{ areaId: string | undefined }>();

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
            {getKeys(today.price).map((key) => (
              <Link
                to={`/area/${areas[key].number}`}
                key={key}
                className={`navigation-link link-${areas[key].number}`}
                style={{
                  borderBottom: `20px solid var(--chart-${areas[key].number})`,
                  borderTop: `20px solid var(--chart-${areas[key].number})`,
                }}
              >
                <li className="navigation-item">
                  <h2 className="header">{areas[key].title}</h2>
                  <p className="price">{today.priceByHour.pricesObj[key][getHours()]}</p>
                  <p>
                    Gjennomsnitt <br />
                    <strong>I dag: {todaysAveragePrices[key]}</strong> <br />
                    {tomorrowsAveragePrices !== null && (
                      <>
                        <strong>I morgen: {tomorrowsAveragePrices[key]}</strong>
                        {todaysAveragePrices[key] > tomorrowsAveragePrices[key] ? '▼' : '▲'}
                      </>
                    )}
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>
        {areaId ? <Outlet /> : <AllPricesChart data={today.price} />}
      </div>
      <Footer />
    </div>
  );
}
