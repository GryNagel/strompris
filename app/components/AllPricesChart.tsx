import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { format, setMinutes } from 'date-fns';
import { addHours } from 'date-fns';

import { areas, viewTimeFormat } from '../_constants';
import { createIsoDate, createViewTime } from '../_utils/date';

import type { CurrentPrice } from '~/_models';

type PriceChartProps = {
    data: CurrentPrice;
};

export default function AllPricesChart({ data }: PriceChartProps) {
    const timeNow = createIsoDate(new Date());
    const timeInAnHour = format(addHours(setMinutes(new Date(), 0), 1), viewTimeFormat);

    const options = {
        title: {
            text: 'Strømpriser',
        },
        series: Object.entries(data).map(([key, value]) => ({
            name: areas[key].title,
            data: [value],
            color: `var(--chart-${areas[key].number})`,
        })),
        xAxis: {
            name: 'NOK',
            categories: [
                `${createViewTime(new Date(timeNow))} -
        ${timeInAnHour}`,
            ],
        },
        yAxis: {
            title: {
                text: 'NOK / kWh',
            },
        },
        chart: {
            type: 'column',
            borderRadius: 8,
            style: {
                fontFamily: '',
            },
        },
        accessibility: { enabled: false },
        credits: {
            enabled: false,
        },
    };

    return <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />;
}
