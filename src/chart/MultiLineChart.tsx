import { Circle, LinePath } from "@visx/shape"
import { useRecoilState } from "recoil"
import { tableDataState, userSelectionState, featureTableState } from "../../states"
import { Element, ChartProps } from "../../types"
import { schemeCategory10 as nonSelectedColor } from "d3-scale-chromatic"
import { curveLinear } from "@visx/curve"
import { hsl } from "d3-color"
import { useMemo } from "react"
import { scaleBand, scaleOrdinal } from "@visx/scale"

const getSelectedColor = (color: string) =>
    String(hsl(hsl(color).h, hsl(color).s, hsl(color).l * 1.5))

export default function MultiLineChart({ xScale, yScale }: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [featureTable, setFeatureTable] = useRecoilState(featureTableState)
    const keys = Object.keys(tableData[0]).filter((d) => d !== "characteristic") as string[]
    const scaleWidth = xScale.bandwidth()

    const ordinalColorScale = useMemo(
        () =>
            scaleOrdinal({
                domain: keys,
                range: [...nonSelectedColor],
            }),
        [keys]
    )

    return (
        <>
            {keys.map((key, key_index) => {
                const nonSelectedColor = ordinalColorScale(key)
                const selectedColor = getSelectedColor(nonSelectedColor)
                return (
                    <>
                        <LinePath
                            data={tableData}
                            x={(d) => (xScale(d.characteristic as string) ?? 0) + scaleWidth / 2}
                            y={(d) => yScale(d[key] as number) ?? 0}
                            stroke={selectedColor}
                            strokeWidth={2}
                        />
                        {tableData.map((d, i) => {
                            const characteristic = d.characteristic as string
                            const value = d[key] as number

                            return (
                                <Circle
                                    key={i}
                                    r={
                                        userSelection.some(
                                            (d) => d.key === `${key}-${characteristic}-${value}`
                                        )
                                            ? 10
                                            : 5
                                    }
                                    cx={(xScale(characteristic) ?? 0) + scaleWidth / 2}
                                    cy={yScale(value)}
                                    fill={
                                        userSelection.some(
                                            (d) => d.key === `${key}-${characteristic}-${value}`
                                        )
                                            ? selectedColor
                                            : nonSelectedColor
                                    }
                                    onClick={() => {
                                        const columnFeature = featureTable[key]
                                        // get feature key by value
                                        const feature = Object.keys(columnFeature).find(
                                            (key) => columnFeature[key] === characteristic
                                        )
                                        if (
                                            userSelection.some(
                                                (d) => d.key === `${key}-${characteristic}-${value}`
                                            )
                                        ) {
                                            setUserSelection(
                                                userSelection.filter(
                                                    (d) =>
                                                        d.key !==
                                                        `${key}-${characteristic}-${value}`
                                                )
                                            )
                                        } else {
                                            const selectedElement = new Element(
                                                `${key}-${characteristic}-${value}`,
                                                feature,
                                                value,
                                                characteristic,
                                                key,
                                                "element"
                                            )
                                            setUserSelection([...userSelection, selectedElement])
                                        }
                                    }}
                                />
                            )
                        })}
                    </>
                )
            })}
        </>
    )
}
