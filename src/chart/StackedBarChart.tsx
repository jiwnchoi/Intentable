import { BarRounded, BarStack, Bar } from "@visx/shape"
import { useRecoilState } from "recoil"
import { tableDataState, userSelectionState, featureTableState } from "../../states"
import { ChartProps, tableDataType, Element } from "../../types"
import { schemeCategory10 as color } from "d3-scale-chromatic"
import { scaleOrdinal } from "@visx/scale"
import { hsl } from "d3-color"
import { checkUserSelection, modifyUserSelection } from "../util/userSelectionUtils"


const getValue = (d: tableDataType) => d.value as number
const getSelectedColor = (color: string) =>
    String(hsl(hsl(color).h, hsl(color).s, hsl(color).l * 1.5))

export default function SimpleBarChart({ xScale, yScale, xMax, yMax, margins }: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [featureTable, setFeatureTable] = useRecoilState(featureTableState)
    const keys = Object.keys(tableData[0]).filter((d) => d !== "characteristic")

    const ordinalColorScale = scaleOrdinal({
        domain: keys,
        range: [...color],
    })

    const getCharacteristics = (index: number) => tableData[index].characteristic as string
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
                        const characteristic = bar.bar.data.characteristic as string
                        const value = bar.bar.data[bar.key] as number
                        const key = bar.key as string
                        return (
                            <Bar
                                key={`bar-stack-${barStack.index}-${bar.index}`}
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
                                    setUserSelection(modifyUserSelection(
                                        userSelection,
                                        featureTable,
                                        key,
                                        characteristic,
                                        value
                                    ))
                                }}
                            />
                        )
                    })
                )
            }
        </BarStack>
    )
}
