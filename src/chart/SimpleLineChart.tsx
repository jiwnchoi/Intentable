import { Circle, LinePath } from "@visx/shape"
import { useRecoilState } from "recoil"
import { tableDataState, userSelectionState, featureTableState } from "../../states"
import { Element, ChartProps } from "../../types"
import { schemeCategory10 as nonSelectedColor } from "d3-scale-chromatic"
import { curveLinear } from "@visx/curve"
import { hsl } from "d3-color"

const selectedColor = nonSelectedColor.map((c) => hsl(hsl(c).h, hsl(c).s, hsl(c).l * 1.5))

export default function SimpleLineChart({ xScale, yScale }: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [featureTable, setFeatureTable] = useRecoilState(featureTableState)
    const scaleWidth = xScale.bandwidth()
    return (
        <>
            <LinePath
                curve={curveLinear}
                data={tableData}
                x={(d) => (xScale(d.characteristic as string) ?? 0) + scaleWidth / 2}
                y={(d) => yScale(d.value as number) ?? 0}
                stroke={nonSelectedColor[0]}
                strokeWidth={2}
            />
            {tableData.map((d, i) => {
                const characteristic = d.characteristic as string
                const value = d.value as number

                return (
                    <Circle
                        key={i}
                        r={
                            userSelection.some((d) => d.key === `value-${characteristic}-${value}`)
                                ? 10
                                : 5
                        }
                        cx={(xScale(characteristic) ?? 0) + scaleWidth / 2}
                        cy={yScale(value)}
                        fill={
                            userSelection.some((d) => d.key === `value-${characteristic}-${value}`)
                                ? String(selectedColor[0])
                                : (nonSelectedColor[0] as string)
                        }
                        onClick={() => {
                            const columnFeature = featureTable["value"]
                            // get feature key by value
                            const feature = Object.keys(columnFeature).find(
                                (key) => columnFeature[key] === characteristic
                            )
                            if (
                                userSelection.some(
                                    (d) => d.key === `value-${characteristic}-${value}`
                                )
                            ) {
                                setUserSelection(
                                    userSelection.filter(
                                        (d) => d.key !== `value-${characteristic}-${value}`
                                    )
                                )
                            } else {
                                const selectedElement = new Element(
                                    `value-${characteristic}-${value}`,
                                    feature,
                                    value,
                                    characteristic,
                                    "value",
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
}
