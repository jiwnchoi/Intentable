import { BarRounded, BarStack, Bar } from "@visx/shape";
import { useRecoilState } from "recoil";
import {
    tableDataState,
    userSelectionState,
    featureTableState,
} from "../../states";
import { ChartProps, tableDataType, Element } from "../../types";
import { schemeCategory10 as color } from "d3-scale-chromatic";
import { scaleOrdinal } from "@visx/scale";
import { hsl } from "d3-color";

const margins = { top: 20, right: 20, bottom: 40, left: 40 };

const getValue = (d: tableDataType) => d.value as number;
const getSelectedColor = (color: string) =>
    String(hsl(hsl(color).h, hsl(color).s, hsl(color).l * 1.5));

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
    const keys = Object.keys(tableData[0]).filter(
        (d) => d !== "characteristic"
    );

    const ordinalColorScale = scaleOrdinal({
        domain: keys,
        range: [...color],
    });

    const getCharacteristics = (index: number) =>
        tableData[index].characteristic as string;
    return (
        <BarStack
            data={tableData}
            keys={keys}
            x={(d) => d.characteristic as string}
            xScale={xScale}
            yScale={yScale}
            color={ordinalColorScale}
        >
            {(barStacks) =>
                barStacks.map((barStack) =>
                    barStack.bars.map((bar) => {
                        const characteristic = bar.bar.data.characteristic;
                        const value = bar.bar.data[bar.key] as number;
                        return (
                            <Bar
                                key={`bar-stack-${barStack.index}-${bar.index}`}
                                x={bar.x}
                                y={bar.y + margins.top}
                                width={bar.width}
                                height={bar.height}
                                fill={
                                    userSelection.some(
                                        (d) =>
                                            d.key ===
                                            `${bar.key}-${characteristic}-${value}`
                                    )
                                        ? getSelectedColor(bar.color)
                                        : bar.color
                                }
                                onClick={() => {
                                    console.log(bar)
                                    const columnFeature = featureTable[bar.key];
                                    const feature = Object.keys(
                                        columnFeature
                                    ).find(
                                        (key) =>
                                            columnFeature[key] ===
                                            characteristic
                                    );
                                    if (
                                        userSelection.some(
                                            (d) =>
                                                d.key ===
                                                `${bar.key}-${characteristic}-${value}`
                                        )
                                    ) {
                                        setUserSelection(
                                            userSelection.filter(
                                                (d) =>
                                                    d.key !==
                                                    `${bar.key}-${characteristic}-${value}`
                                            )
                                        );
                                    } else {
                                        const selectedElement = new Element(
                                            `${bar.key}-${characteristic}-${value}`,
                                            feature,
                                            value,
                                            String(characteristic),
                                            bar.key,
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
                    })
                )
            }
        </BarStack>
    );
}
