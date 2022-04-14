import {  BarGroup, Bar } from "@visx/shape"
import { useRecoilState } from "recoil"
import { tableDataState, userSelectionState, featureTableState } from "../../states"
import { ChartProps } from "../../types"
import { schemeCategory10 as color } from "d3-scale-chromatic"
import { scaleOrdinal, scaleBand } from "@visx/scale"
import { Group } from "@visx/group"
import { useMemo } from "react"
import { hsl } from "d3-color"
import { Element } from "../../types"
import { checkUserSelection, modifyUserSelection } from "../util/userSelectionUtils"

const getSelectedColor = (color: string) =>
    String(hsl(hsl(color).h, hsl(color).s, hsl(color).l * 1.5))

export default function GroupedBarChart({ xScale, yScale, xMax, yMax, margins}: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [featureTable, setFeatureTable] = useRecoilState(featureTableState)

    const keys = Object.keys(tableData[0]).filter((d) => d !== "characteristic") as string[]

    const ordinalColorScale = useMemo(
        () =>
            scaleOrdinal({
                domain: keys,
                range: [...color],
            }),
        [keys]
    )

    const barScle = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xScale.bandwidth()],
                domain: keys,
                padding: 0.1,
            }),
        [xScale]
    )

    const getCharacteristics = (index: number) => tableData[index].characteristic

    return (
        <>
            <BarGroup
                data={tableData}
                keys={keys}
                height={yMax}
                x0={(d) => d.characteristic as string}
                x0Scale={xScale}
                x1Scale={barScle}
                yScale={yScale}
                color={ordinalColorScale}
            >
                {(barGroups) =>
                    barGroups.map((barGroup) => {
                        const characteristic = getCharacteristics(barGroup.index) as string
                        return (
                            <Group key={`bar-group-${barGroup.index}`} left={barGroup.x0}>
                                {barGroup.bars.map((bar) => { 
                                    const key = bar.key as string
                                    const value = bar.value as number
                                    
                                    return (
                                    <Bar
                                        key={`bar-group-bar-${barGroup.index}-${bar.index}`}
                                        x={bar.x}
                                        y={bar.y + margins.top}
                                        width={bar.width}
                                        height={bar.height}
                                        fill={
                                            checkUserSelection(userSelection, key, characteristic, value)
                                                ? getSelectedColor(bar.color)
                                                : bar.color
                                        }
                                        onClick={() => {
                                            setUserSelection(
                                                modifyUserSelection(
                                                    userSelection,
                                                    featureTable,
                                                    key,
                                                    characteristic,
                                                    value
                                                )
                                            )
                                        }}
                                    />
                                )}
                                )}
                            </Group>
                        )
                    })
                }
            </BarGroup>
        </>
    )
}
