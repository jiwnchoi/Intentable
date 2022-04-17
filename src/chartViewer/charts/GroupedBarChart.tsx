import { Group } from "@visx/group"
import { scaleBand } from "@visx/scale"
import { BarGroup, Bar } from "@visx/shape"
import { useMemo } from "react"
import { useRecoilState } from "recoil"
import { chooseTargetState, selectedTargetsState, targetTableState } from "../../../states"
import { ChartProps, SelectedTarget } from "../../../types"
import { getColorScheme, getSelectedColorScheme } from "../../util/colorSchemeUtils"
import { transposeTable } from "../../util/transposeTable"
import { checkUserSelection, modifyUserSelection } from "../../util/userSelectionUtils"

export default function GroupedBarChart({ xScale, yScale, xMax, yMax, margins }: ChartProps) {
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [chooseTarget, setChooseTarget] = useRecoilState(chooseTargetState)
    const [selectedTargets, setSelectedTargets] = useRecoilState(selectedTargetsState)

    const seriesList = useMemo(() => Object.keys(targetTable), [targetTable])
    const colorScheme = useMemo(() => getColorScheme(seriesList), [seriesList])
    const selectedColorScheme = useMemo(() => getSelectedColorScheme(seriesList), [seriesList])
    const tableData = useMemo(() => transposeTable(targetTable), [targetTable])
    const barScle = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xScale.bandwidth()],
                domain: seriesList,
                padding: 0.1,
            }),
        [xScale]
    )

    return (
        <>
            <BarGroup
                data={tableData}
                keys={seriesList}
                height={yMax}
                x0={(d) => d.characteristic}
                x0Scale={xScale}
                x1Scale={barScle}
                yScale={yScale}
                color={colorScheme}
            >
                {(barGroups) =>
                    barGroups.map((barGroup, i) => {
                        console.log(targetTable)
                        return (
                            <Group key={`bar-group-${barGroup.index}`} left={barGroup.x0}>
                                {barGroup.bars.map((bar) => {
                                    const d = targetTable[bar.key][i] as SelectedTarget
                                    
                                    console.log(d, bar)
                                    return (
                                        <Bar
                                            key={`bar-group-bar-${i}`}
                                            x={bar.x}
                                            y={bar.y + margins.top}
                                            width={bar.width}
                                            height={bar.height}
                                            fill={
                                                checkUserSelection(selectedTargets, d)
                                                    ? selectedColorScheme(bar.key)
                                                    : colorScheme(bar.key)
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
                                })}
                            </Group>
                        )
                    })
                }
            </BarGroup>
        </>
    )
}
