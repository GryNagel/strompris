import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { format, setMinutes } from 'date-fns';
import { addHours } from 'date-fns';

import type { PriceView } from '../_models';
import { Areas, viewTimeFormat } from '../_constants';
import { createIsoDate, createViewTime } from '../_utils/date';

type PriceChartProps = {
    data: PriceView[];
};

export default function AllPricesChart({ data }: PriceChartProps) {
    const timeNow = createIsoDate(new Date());
    const timeInAnHour = format(addHours(setMinutes(new Date(), 0), 1), viewTimeFormat);

    const options = {
        title: {
            text: 'Strømpriser',
        },
        series: data.map((areaPrice) => ({
            name: Areas.find((item) => item.number === areaPrice.area)?.title,
            data: areaPrice.prices
                .filter((item) => item.validFrom === timeNow)
                .map((item) => item.price),
            color: `var(--chart-${areaPrice.area}`,
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
    };

    return <HighchartsReact highcharts={Highcharts} constructorType={'chart'} options={options} />;
}
