import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { format } from 'date-fns';
import { addHours } from 'date-fns';

type PriceChartProps = {
  today: number[];
  tomorrow: number[];
  areaName: string | undefined;
  areaNumber: string | undefined;
  hours: string[];
};

export default function PriceChart({
  today,
  tomorrow,
  areaName,
  hours,
  areaNumber,
}: PriceChartProps) {
  const options = {
    title: {
      text: `Strømpriser - ${areaName}`,
    },
    series: [
      {
        name: 'Today',
        data: today,
        color: `var(--chart-${areaNumber})`,
      },
      {
        name: 'Tomorrow',
        data: tomorrow,
        color: `var(--chart-highlight)`,
      },
    ],
    xAxis: {
      name: 'NOK',
      categories: hours.map((hour) => hour.split('-')[0]),
      plotBands: [
        {
          from: format(new Date(), 'HH'),
          to: format(addHours(new Date(), 1), 'HH'),
          color: '#E8E8E8',
        },
      ],
    },
    yAxis: {
      title: {
        text: 'NOK / kWh',
      },
    },
    chart: {
      type: 'areaspline',
      borderRadius: 8,
      style: {
        fontFamily: '',
      },
    },
    subtitle: {
      text: tomorrow ? '' : 'Prisene for i morgen kommer mellom 12-13',
    },
  };

  return <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />;
}
