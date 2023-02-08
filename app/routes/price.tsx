import { NavLink, Outlet, useLoaderData } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';

import Header from '../components/Header';
import { areas } from '../_constants';
import Footer from '../components/Footer';

import priceStylesUrl from '~/styles/price.css';
import { getTodaysPrices, getTomorrowsPrices } from '~/_utils/api.server';
import { getEntries, getKeys } from '~/_utils/object';
import { getAveragePrice } from '~/_utils/average.server';
import type { AveragePrices, Cities, PriceByHour } from '~/_models';

export let links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: priceStylesUrl }];
};

type LoaderData = {
  today: Awaited<ReturnType<typeof getTodaysPrices>>;
  tomorrow: Awaited<ReturnType<typeof getTomorrowsPrices>>;
  todaysAveragePrices: AveragePrices;
  tomorrowsAveragePrices: AveragePrices | null;
};

export const loader = async (): Promise<LoaderData> => {
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

  return { today, tomorrow, todaysAveragePrices, tomorrowsAveragePrices };
};

export default function PriceRoute() {
  const { today } = useLoaderData() as LoaderData;

  return (
    <div className="price-container">
      <Header />
      <div className="container">
        <div className="link-container">
          {getKeys(today.priceByHour.pricesObj).map((key) => (
            <NavLink
              key={key}
              to={areas[key].number}
              style={{
                color: `var(--chart-${areas[key].number})`,
                borderColor: `var(--chart-${areas[key].number})`,
                outlineColor: `var(--chart-${areas[key].number})`,
              }}
              className={({ isActive }) =>
                isActive
                  ? `link link-active link-${areas[key].number}`
                  : `link link-${areas[key].number}`
              }
              prefetch="intent"
            >
              {areas[key].title}
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
