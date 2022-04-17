import { Bar, BarStack } from "@visx/shape"
import { scaleLinear } from "d3-scale"
import { useMemo } from "react"
import { useRecoilState } from "recoil"
import { chooseTargetState, selectedTargetsState, targetTableState } from "../../../states"
import { ChartProps, SelectedTarget } from "../../../types"
import { getColorScheme, getSelectedColorScheme } from "../../util/colorSchemeUtils"
import { transposeTable } from "../../util/transposeTable"
import { checkUserSelection, modifyUserSelection } from "../../util/userSelectionUtils"

export default function SimpleBarChart({ xScale, yScale, xMax, yMax, margins }: ChartProps) {
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [chooseTarget, setChooseTarget] = useRecoilState(chooseTargetState)
    const [selectedTargets, setSelectedTargets] = useRecoilState(selectedTargetsState)

    const seriesList = useMemo(() => Object.keys(targetTable), [targetTable])
    const colorScheme = useMemo(() => getColorScheme(seriesList), [seriesList])
    const selectedColorScheme = useMemo(() => getSelectedColorScheme(seriesList), [seriesList])
    const tableData = useMemo(() => transposeTable(targetTable), [targetTable])

    // const barYScale = useMemo(() => {
    //     return scaleLinear<number>({
    //         range: [yMax, 0],
    //         round : true,
    //         domain : 
    //     })
    // }, [yMax, margins])

    return (
        <BarStack
            data={tableData}
            keys={seriesList}
            x={(d) => d.characteristic}
            xScale={xScale}
            yScale={yScale}
            color={colorScheme}
        >
            {(barStacks) =>
                barStacks.map((barStack) =>
                    barStack.bars.map((bar, i) => {
                        const d = targetTable[bar.key][i] as SelectedTarget
                        console.log(d)
                        return (
                            <Bar
                                key={`bar-stack-${d.id}`}
                                x={bar.x}
                                y={bar.y + margins.top}
                                width={bar.width}
                                height={bar.height}
                                fill={
                                    checkUserSelection(
                                        selectedTargets,
                                        d
                                    )
                                        ? selectedColorScheme(d.series as string)
                                        : colorScheme(d.series as string)
                                }
                                onClick={() => {
                                    setSelectedTargets(
                                        modifyUserSelection(
                                            selectedTargets,
                                            d,
                                            chooseTarget
                                        )
                                    )
                                }}
                            />
                        )
                    })
                )
            }
        </BarStack>
    )
}
