import { BarRounded } from "@visx/shape";
import { useRecoilState } from "recoil";
import { tableDataState, userSelectionState } from "../../states";
import { ChartProps, TableData } from "../../types";
import { schemeCategory10 as color } from "d3-scale-chromatic";

const margins = { top: 20, right: 20, bottom: 40, left: 40 };

const getValue = (d: TableData) => d.value;
const getCharacteristic = (d: TableData) => d.characteristic;

export default function SimpleBarChart({
    xScale,
    yScale,
    xMax,
    yMax,
}: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const [userSelection, setUserSelection] =
        useRecoilState(userSelectionState);

    return (
        <>
            {tableData.map((d, i) => {
                const characteristic = getCharacteristic(d);
                const value = getValue(d);
                const barWidth = xScale.bandwidth();
                const barHeight = yMax - (yScale(value) ?? 0);
                const barX = xScale(characteristic) ?? 0;
                const barY = yScale(value) + margins.top ?? 0;
                return (
                    <BarRounded
                        key={`bar-${characteristic}`}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={color[0]}
                        opacity={userSelection.includes(`${i} 0`) ? 1 : 0.5}
                        radius={barWidth / 8}
                        top={true}
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
        </>
    );
}
