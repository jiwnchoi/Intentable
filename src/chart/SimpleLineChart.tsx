import { useMemo } from "react";
import { Circle, LinePath } from "@visx/shape";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useRecoilState } from "recoil";
import { tableDataState, userSelectionState } from "../../states";
import { ChartProps, TableData } from "../../types";
import { schemeCategory10 as color } from "d3-scale-chromatic";
import { curveLinear } from "@visx/curve";

const margins = { top: 20, right: 20, bottom: 40, left: 40 };

const getValue = (d: TableData) => d.value;
const getCharacteristic = (d: TableData) => d.characteristic;

export default function SimpleLineChart({ xScale, yScale }: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState);
    const scaleWidth = xScale.bandwidth();
    return (
        <>
            {tableData.map((d, i) => {
                const characteristic = getCharacteristic(d);
                const value = getValue(d);

                return (
                    <Circle
                        key={i}
                        r={10}
                        fill={color[0]}
                        cx={(xScale(characteristic) ?? 0) + scaleWidth / 2}
                        cy={yScale(value)}
                        opacity={userSelection.includes(`${i} 0`) ? 1 : 0.5}
                        onClick={(i) => {
                            if (userSelection.includes(`${i} 0`))
                                setUserSelection(
                                    userSelection.filter((d) => d !== `${i} 0`)
                                );
                            else setUserSelection([...userSelection, `${i} 0`]);
                        }}
                    />
                );
            })}
            <LinePath
                curve={curveLinear}
                data={tableData}
                x={(d) => (xScale(getCharacteristic(d)) ?? 0) + scaleWidth / 2}
                y={(d) => yScale(getValue(d)) ?? 0}
                stroke={color[0]}
                opacity={1}
                strokeWidth={2}
            />
            ;
        </>
    );
}
