import { useMemo } from "react";
import { scaleBand, scaleLinear } from "@visx/scale";
import letterFrequency, {
    LetterFrequency,
} from "@visx/mock-data/lib/mocks/letterFrequency";
import { GradientTealBlue } from "@visx/gradient";
import { BarRounded } from "@visx/shape";
import { Group } from "@visx/group";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

export type BarChartProps = {
    width: number;
    height: number;
};

const data = letterFrequency.slice(5);
const verticalMargin = 100;

const getLetter = (d: LetterFrequency) => d.letter;
const getLetterFrequency = (d: LetterFrequency) => Number(d.frequency) * 100;

const BarChart = ({ width, height }: BarChartProps) => {
    const xMax = width;
    const yMax = height - verticalMargin;

    const xScale = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xMax],
                round: true,
                domain: data.map(getLetter),
                padding: 0.2,
            }),
        [xMax]
    );
    const yScale = useMemo(
        () =>
            scaleLinear<number>({
                range: [yMax, 0],
                round: true,
                domain: [0, Math.max(...data.map(getLetterFrequency))],
            }),
        [yMax]
    );

    return (
        <ParentSize className="bar-chart-container" debounceTime={10}>
            {({ width: visWidth, height: visHeight }) => (
                <svg width={visWidth} height={visHeight}>
                    <GradientTealBlue id="teal-blue" />
                    <Group top={verticalMargin / 2} left={0}>
                        {data.map((d, i) => {
                            const letter = getLetter(d);
                            const barWidth = xScale.bandwidth();
                            const barHeight =
                                yMax - (yScale(getLetterFrequency(d)) ?? 0);
                            const barX = xScale(letter);
                            const barY = yMax - barHeight;
                            return (
                                <BarRounded
                                    key={`bar-${letter}`}
                                    radius={32}
                                    x={barX}
                                    y={barY}
                                    width={barWidth}
                                    height={barHeight}
                                    fill="url(#teal-blue)"
                                    onClick={() => {
                                        console.log(`Clicked on ${letter}`);
                                    }}
                                />
                            );
                        })}
                    </Group>
                </svg>
            )}
        </ParentSize>
    );
};

export default BarChart;
