import type { LoaderFunction, MetaFunction } from "remix";
import { useLoaderData } from "remix";
import { addDays } from "date-fns";

import PriceChart from "../../components/PriceChart";
import { getPricesForArea } from "../../_utils/price.server";
import { Areas } from "../../_constants";
import type { PriceView } from "../../_models";
import { createIsoDate } from "../../_utils/date";

type LoaderData = {
  today: PriceView;
  tomorrow: PriceView;
  areaName: string | undefined;
};

export const meta: MetaFunction = ({ params }) => {
  return {
    title: `Strømpriser - ${Areas.find((item) => item.number === params.area)}`,
  };
};

export let loader: LoaderFunction = async ({
  params,
}): Promise<LoaderData | null> => {
  const todaysDate = new Date();
  const today = createIsoDate(todaysDate);
  const tomorrow = createIsoDate(addDays(todaysDate, 1));

  if (params.area) {
    let todayRes = await getPricesForArea(params.area, today);
    let tomorrowRes = await getPricesForArea(params.area, tomorrow);

    return {
      today: todayRes,
      tomorrow: tomorrowRes,
      areaName: Areas.find((item) => item.number === params.area)?.title,
    };
  }
  return null;
};

export default function PriceRoute() {
  let data = useLoaderData<LoaderData>();

  return (
    <PriceChart
      today={data.today.prices}
      tomorrow={data.tomorrow?.prices || []}
      areaName={data.areaName}
    />
  );
}
