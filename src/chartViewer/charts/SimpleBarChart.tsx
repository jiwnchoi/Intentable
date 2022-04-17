import { Bar } from "@visx/shape"
import { useMemo } from "react"
import { useRecoilState } from "recoil"
import { chooseTargetState, selectedTargetsState, targetTableState } from "../../../states"
import { ChartProps } from "../../../types"
import { selectedSingleColor, singleColor } from "../../util/colorSchemeUtils"
import { checkUserSelection, modifyUserSelection } from "../../util/userSelectionUtils"

export default function SimpleBarChart({ xScale, yScale, xMax, yMax, margins }: ChartProps) {
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [chooseTarget, setChooseTarget] = useRecoilState(chooseTargetState)
    const [selectedTargets, setSelectedTargets] = useRecoilState(selectedTargetsState)

    const color = singleColor
    const selectedColor = selectedSingleColor
    const scaleWidth = useMemo(xScale.bandwidth, [xScale])

    return (
        <>
            {targetTable["value"].map((d, i) => {
                const key = d.key
                const value = d.value
                const barWidth = scaleWidth
                const barHeight = yMax - (yScale(value) ?? 0)
                const barX = xScale(key) ?? 0
                const barY = yScale(value) + margins.top ?? 0
                return (
                    <Bar
                        key={`bar-${d.key + d.series + String(d.value)}`}
                        x={barX}
                        y={barY}
                        width={barWidth}
                        height={barHeight}
                        fill={checkUserSelection(selectedTargets, d) ? selectedColor : color}
                        onClick={() => {
                            setSelectedTargets(
                                modifyUserSelection(selectedTargets, d, chooseTarget)
                            )
                        }}
                    />
                )
            })}
        </>
    )
}
