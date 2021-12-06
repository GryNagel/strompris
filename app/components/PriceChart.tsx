import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { format, isBefore } from "date-fns";
import { addHours } from "date-fns";

import { createViewTime } from "../_utils/date";

import type { Price } from ".prisma/client";

type PriceChartProps = {
  today: Price[];
  tomorrow: Price[];
  areaName: string | undefined;
};

function getSeries(today: Price[], tomorrow: Price[]) {
  const todayOptions = {
    name: "I dag",
    data: today
      .sort((a, b) =>
        isBefore(new Date(a.validFrom), new Date(b.validFrom)) ? -1 : 1
      )
      .map((item) => item.price),
    color: "#ffa238",
  };

  if (tomorrow.length !== 0) {
    const tomorrowOptions = {
      name: "I morgen",
      data: tomorrow
        .sort((a, b) =>
          isBefore(new Date(a.validFrom), new Date(b.validFrom)) ? -1 : 1
        )
        .map((item) => item.price),
      color: "#3a91b6",
    };
    return [todayOptions, tomorrowOptions];
  }

  return [todayOptions];
}

export default function PriceChart({
  today,
  tomorrow,
  areaName,
}: PriceChartProps) {
  const options = {
    title: {
      text: `Strømpriser - ${areaName}`,
    },
    series: [...getSeries(today, tomorrow)],
    xAxis: {
      name: "NOK",
      categories: today.map((item) => createViewTime(item.validFrom)),
      plotBands: [
        {
          from: format(new Date(), "HH"),
          to: format(addHours(new Date(), 1), "HH"),
          color: "#E8E8E8",
        },
      ],
    },
    yAxis: {
      title: {
        text: "NOK / kWh",
      },
    },
    chart: {
      type: "areaspline",
      borderRadius: 8,
      style: {
        fontFamily: "",
      },
    },
  };

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"chart"}
      options={options}
    />
  );
}
