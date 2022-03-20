import { useMemo } from "react";
import { Bar } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useRecoilState } from "recoil";
import { tableDataState } from "../../states";
import { ChartProps, TableData } from "../../types";

const horizontalMargin = 40;
const verticalMargin = 40;

const getValue = (d: TableData) => d.value;
const getCharacteristic = (d: TableData) => d.characteristic;

export default function SimpleBarChart({ width, height }: ChartProps) {
    const [tableData, setTableData] =
        useRecoilState<TableData[]>(tableDataState);

    const xMax = width - horizontalMargin;
    const yMax = height - verticalMargin;

    const xScale = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xMax],
                round: true,
                domain: tableData.map(getCharacteristic),
                padding: 0.2,
            }),
        [xMax, tableData]
    );
    const yScale = useMemo(() => {
        console.log(
            Math.min(...tableData.map(getValue)),
            Math.max(...tableData.map(getValue))
        );
        return scaleLinear<number>({
            range: [yMax, 0],
            round: true,
            domain: [
                Math.min(...tableData.map(getValue)),
                Math.max(...tableData.map(getValue)),
            ],
        });
    }, [yMax, tableData]);

    // useEffect(() => {
    //     forceUpdate()
    // }, [tableData])

    return (
        <>
            <svg width={width} height={height}>
                <Group left={horizontalMargin} top={verticalMargin / 2}>
                    {tableData.map((d) => {
                        const letter = getCharacteristic(d);
                        const barWidth = xScale.bandwidth();
                        const barHeight = yMax - (yScale(getValue(d)) ?? 0);
                        const barX = xScale(letter);
                        const barY = yMax - barHeight;
                        // console.log(letter, barWidth, barHeight, barX, barY);
                        return (
                            <Bar
                                key={`bar-${letter}`}
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={barHeight}
                                fill="#4880C8"
                                onClick={() => {
                                    console.log(d);
                                }}
                            />
                        );
                    })}
                </Group>
                <AxisLeft
                    scale={yScale}
                    left={horizontalMargin}
                    top={verticalMargin / 2}
                />
                <AxisBottom
                    left={horizontalMargin}
                    top={yMax + verticalMargin / 2}
                    scale={xScale}
                    stroke="#000"
                    tickStroke="#000"
                    tickLabelProps={(d) => ({
                        textAnchor: "middle",
                        fontSize: 12,
                    })}
                />
            </svg>
        </>
    );
}
