import { useMemo } from "react";
import { Circle, LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useRecoilState } from "recoil";
import { tableDataState } from "../../states";
import { ChartProps, TableData } from "../../types";
import { schemeCategory10 as color } from "d3-scale-chromatic";
import { curveLinear } from "@visx/curve";

const margins = { top: 20, right: 20, bottom: 40, left: 40 };

const getValue = (d: TableData) => d.value;
const getCharacteristic = (d: TableData) => d.characteristic;

export default function SimpleLineChart({ xScale, yScale }: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const scaleWidth = xScale.bandwidth();
    return (
        <>
            {tableData.map((d, i) => {
                const characteristic = getCharacteristic(d);
                const value = getValue(d);

                return (
                    <Circle
                        key={i}
                        r={5}
                        fill={color[0]}
                        cx={(xScale(characteristic) ?? 0) + scaleWidth / 2}
                        cy={yScale(value)}
                    />
                );
            })}
            <LinePath
                curve={curveLinear}
                data={tableData}
                x={(d) => (xScale(getCharacteristic(d)) ?? 0) + scaleWidth / 2}
                y={(d) => yScale(getValue(d)) ?? 0}
                stroke={color[0]}
                strokeWidth={2}
            />
            ;
        </>
    );
}
