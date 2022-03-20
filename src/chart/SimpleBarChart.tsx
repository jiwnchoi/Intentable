import { BarRounded } from "@visx/shape";
import { useRecoilState } from "recoil";
import { tableDataState } from "../../states";
import { ChartProps, TableData } from "../../types";
import { schemeCategory10 as color } from "d3-scale-chromatic";

const margins = { top: 20, right: 20, bottom: 40, left: 40 };

const getValue = (d: TableData) => d.value;
const getCharacteristic = (d: TableData) => d.characteristic

export default function SimpleBarChart({ xScale, yScale, xMax, yMax }: ChartProps) {
    const [tableData, setTableData] =
        useRecoilState<TableData[]>(tableDataState);

    return (
        <>
            {tableData.map((d) => {
                const characteristic = getCharacteristic(d);
                const value = getValue(d);
                const barWidth = xScale.bandwidth();
                const barHeight = yMax - (yScale(value) ?? 0);
                const barX = xScale(characteristic) ?? 0;
                const barY = yScale(value) + margins.top ?? 0; ;
                return (
                    <BarRounded
                        key={`bar-${characteristic}`}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={color[0]}
                        radius={barWidth / 8}
                        top={true}
                        onClick={() => {
                            console.log(d);
                        }}
                    />
                );
            })}

        </>
    );
}
