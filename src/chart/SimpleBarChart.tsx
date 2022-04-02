import { Bar } from "@visx/shape";
import { useRecoilState } from "recoil";
import {
    featureTableState,
    tableDataState,
    userSelectionState,
} from "../../states";
import { ChartProps, Selection, Element } from "../../types";
import { schemeCategory10 as nonSelectedColor } from "d3-scale-chromatic";
import { hsl } from 'd3-color';

const selectedColor = nonSelectedColor.map(c => hsl(hsl(c).h, hsl(c).s, hsl(c).l * 1.5));


const margins = { top: 20, right: 20, bottom: 40, left: 40 };

export default function SimpleBarChart({
    xScale,
    yScale,
    xMax,
    yMax,
}: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const [userSelection, setUserSelection] =
        useRecoilState(userSelectionState); 
    const [featureTable, setFeatureTable] = useRecoilState(featureTableState);
    return (
        <>
            {tableData.map((d, i) => {
                const characteristic = d.characteristic as string;
                const value = d.value as number;
                const barWidth = xScale.bandwidth();
                const barHeight = yMax - (yScale(value) ?? 0);
                const barX = xScale(characteristic) ?? 0;
                const barY = yScale(value) + margins.top ?? 0;
                return (
                    <Bar
                        key={`bar-${characteristic}`}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={userSelection.some(
                            (d) => d.key === `value-${characteristic}-${value}`
                        )? String(selectedColor[0]) : nonSelectedColor[0] as string}
                        onClick={() => {
                            const columnFeature = featureTable["value"];
                            // get feature key by value
                            const feature = Object.keys(columnFeature).find(
                                (key) => columnFeature[key] === characteristic
                            );
                            if (
                                userSelection.some(
                                    (d) =>
                                        d.key ===
                                        `value-${characteristic}-${value}`
                                )
                            ) {
                                setUserSelection(
                                    userSelection.filter(
                                        (d) =>
                                            d.key !==
                                            `value-${characteristic}-${value}`
                                    )
                                );
                            } else {
                                const selectedElement = new Element(
                                    `value-${characteristic}-${value}`,
                                    feature,
                                    value,
                                    characteristic,
                                    "value",
                                    "element"
                                );
                                setUserSelection([
                                    ...userSelection,
                                    selectedElement,
                                ]);
                            }
                        }}
                    />
                );
            })}
        </>
    );
}
