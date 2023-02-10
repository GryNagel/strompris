import type { LoaderFunction } from '@remix-run/node';
import { useCatch, useLoaderData, useMatches } from '@remix-run/react';

import type { Area } from '~/types';
import { areas, PricesSchema } from '~/types';
import PriceChart from '~/components/PriceChart';

type LoaderData = {
  area: Area | undefined;
};

export const loader: LoaderFunction = async ({ params }) => {
  const area = Object.values(areas).find((value) => value.number === params.areaId);

  return { area };
};

export default function PriceRoute() {
  const matches = useMatches();
  const { area } = useLoaderData() as LoaderData;

  const data = matches.find((match) => match.id === 'routes/area')?.data;
  const parsedToday = PricesSchema.safeParse(data?.today);
  const parsedTomorrow = PricesSchema.safeParse(data?.tomorrow);

  if (!data || !parsedToday.success || !area) {
    throw new Error('No data to see here');
  }
  const today = parsedToday.data.priceByHour.pricesObj[area.original];
  const tomorrow = parsedTomorrow.success
    ? parsedTomorrow.data.priceByHour.pricesObj[area.original]
    : [];

  return (
    <div className="price-chart">
      <PriceChart
        today={today}
        hours={parsedToday.data.priceByHour.hours}
        tomorrow={tomorrow}
        areaName={area?.title}
        areaNumber={area?.number}
      />
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

export function ErrorBoundary({ error }: { error: Error }) {
  return <div className="error-container">{error.message}</div>;
}
