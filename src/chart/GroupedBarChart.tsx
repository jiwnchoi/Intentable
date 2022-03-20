import { BarRounded, BarGroup, Bar } from "@visx/shape";
import { useRecoilState } from "recoil";
import { tableDataState } from "../../states";
import { ChartProps, TableData } from "../../types";
import { schemeCategory10 as color } from "d3-scale-chromatic";
import { scaleOrdinal, scaleBand, scaleLinear } from "@visx/scale";
import { Group } from "@visx/group";
import { useMemo } from "react";

const margins = { top: 20, right: 20, bottom: 40, left: 40 };

const getValue = (d: TableData) => d.value;
const getCharacteristic = (d: TableData) => d.characteristic;
const getAllValueList = (tableData: TableData[]) => {
    const values: number[] = [];
    for (let d of tableData)
        for (let key in d)
            if (key !== "characteristic") values.push(Number(d[key]));
    return values;
};
export default function GroupedBarChart({
    xScale,
    yScale,
    xMax,
    yMax,
}: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const keys = Object.keys(tableData[0]).filter(
        (d) => d !== "characteristic"
    ) as string[];

    const ordinalColorScale = useMemo(() => scaleOrdinal({
        domain: keys,
        range: [...color],
    }), [keys]);

    const barScle = useMemo(() => scaleBand<string>({
        range: [0, xScale.bandwidth()],
        domain: keys,
        padding: 0.1,
    }), [xScale]);


    
    return (
        <>
            <BarGroup
                data={tableData}
                keys={keys}
                height={yMax}
                x0={getCharacteristic}
                x0Scale={xScale}
                x1Scale={barScle}
                yScale={yScale}
                color={ordinalColorScale}
            >
                {(barGroups) =>
                    barGroups.map((barGroup) => (
                        <Group
                            key={`bar-group-${barGroup.index}`}
                            left={barGroup.x0}
                        >
                            {barGroup.bars.map((bar) => (
                                <Bar
                                    key={`bar-group-bar-${barGroup.index}-${bar.index}`}
                                    x={bar.x}
                                    y={bar.y + margins.top}
                                    width={bar.width}
                                    height={bar.height}
                                    fill={bar.color}
                                    onClick={() => {
                                        console.log(bar);
                                    }}
                                />
                            ))}
                        </Group>
                    ))
                }
            </BarGroup>
        </>
    );
}
