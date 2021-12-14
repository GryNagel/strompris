import type { ReactElement } from 'react';

import { areas } from '../_constants';
import type { PriceView } from '../_models';
import { createIsoDate } from '../_utils/date';

type PriceChartProps = {
    data: PriceView[];
};

export function BarChart({ data }: PriceChartProps): ReactElement {
    let timeNow = createIsoDate(new Date());

    let series = data.map((areaPrice) => ({
        areaName: areas.find((item) => item.number === areaPrice.area)?.title || areaPrice.area,
        price: areaPrice.prices
            .filter((item) => item.validFrom === timeNow)
            .map((item) => item.price)[0],
        color: `var(--chart-${areaPrice.area})`,
    }));

    let prices = series.map((item) => item.price);
    let highestPrice = Math.max(...prices);

    let width = 90;
    let modifier = 200;
    let height = highestPrice * modifier + 50;
    let spacing = 20;

    let numberOfLines = Math.ceil(highestPrice / 0.25) + 1;

    let startPositionOffset = 41;

    const lines = () => {
        let lines = [];
        for (let index = 0; index < numberOfLines; index++) {
            lines.push({
                y:
                    height -
                    startPositionOffset -
                    ((height - startPositionOffset) / numberOfLines) * index,
                label: 0.25 * index,
            });
        }
        return lines;
    };

    return (
        <div className="chart-container">
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className="chart"
                aria-labelledby="title"
                role="img"
                height={height}
                width="100%"
            >
                <g width="100%" transform={`translate(80, 10)`}>
                    <text dominantBaseline="middle" textAnchor="middle">
                        Strømpriser akkurat nå
                    </text>
                    {series.map((item, index) => (
                        <g key={item.areaName} transform={`translate(${100 + 100 * index}, -10)`}>
                            <circle cx="10" cy="10" r="10" style={{ fill: item.color }} />
                            <text x="30" y="17" style={{ color: item.color }}>
                                {item.areaName}
                            </text>
                        </g>
                    ))}
                </g>
                {lines().map((line) => (
                    <g y1={line.y} key={line.label}>
                        <line
                            y1={line.y}
                            y2={line.y}
                            x1="40"
                            x2="100%"
                            style={{ stroke: 'lightgrey' }}
                        />
                        <text x="0" y={line.y + 7} style={{ color: 'lightgrey' }}>
                            {line.label === 0 ? '' : line.label}
                        </text>
                    </g>
                ))}
                <g
                    style={{
                        transform: `translate(20%)`,
                    }}
                >
                    {series.map((item, index) => (
                        <>
                            <g
                                key={item.areaName}
                                className="bar"
                                transform={`translate(${width * index}, 0)`}
                                style={{ fill: item.color }}
                            >
                                <rect
                                    height={item.price * modifier}
                                    y={height - item.price * modifier}
                                    width={width}
                                    x={index + spacing + 120}
                                >
                                    <animate
                                        attributeName="height"
                                        from="0"
                                        to={item.price * modifier}
                                        dur="0.8s"
                                        fill="freeze"
                                    />
                                    <animate
                                        attributeName="y"
                                        from={height}
                                        to={height - item.price * modifier}
                                        dur="0.8s"
                                        fill="freeze"
                                    />
                                </rect>

                                <rect
                                    x={index + spacing + 120}
                                    y={height - item.price * modifier - 25}
                                    className="tooltip-background"
                                    height="20px"
                                    width={width}
                                />
                                <text
                                    x={index + spacing + 120}
                                    y={height - item.price * modifier - 5}
                                    style={{ color: item.color }}
                                    className="tooltip"
                                >
                                    {item.areaName}: {item.price}
                                </text>
                            </g>
                        </>
                    ))}
                </g>
            </svg>
        </div>
    );
}
