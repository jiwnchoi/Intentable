import { curveLinear } from "@visx/curve"
import { Circle, LinePath } from "@visx/shape"
import { useMemo } from "react"
import { useRecoilState } from "recoil"
import { chooseTargetState, selectedTargetsState, targetTableState } from "../../../states"
import { ChartProps } from "../../../types"
import { selectedSingleColor, singleColor } from "../../util/colorSchemeUtils"
import { checkUserSelection, modifyUserSelection } from "../../util/userSelectionUtils"

export default function SimpleLineChart({ xScale, yScale, margins }: ChartProps) {
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [chooseTarget, setChooseTarget] = useRecoilState(chooseTargetState)
    const [selectedTargets, setSelectedTargets] = useRecoilState(selectedTargetsState)

    const color = singleColor
    const selectedColor = selectedSingleColor
    const scaleWidth = useMemo(xScale.bandwidth, [xScale])

    return (
        <>
            <LinePath
                curve={curveLinear}
                data={targetTable["value"]}
                x={(d) => (xScale(d.key) ?? 0) + scaleWidth / 2}
                y={(d) => yScale(d.value) ?? 0}
                stroke={selectedColor}
                strokeWidth={2}
            />
            {targetTable["value"].map((d, i) => {
                const key = d.key
                const value = d.value
                return (
                    <Circle
                        key={i}
                        r={checkUserSelection(selectedTargets, d) ? 10 : 5}
                        cx={(xScale(d.key) ?? 0) + scaleWidth / 2}
                        cy={yScale(value)}
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
