import { Group } from "@visx/group"
import { Pie } from "@visx/shape"
import { useMemo } from "react"
import { useRecoilState } from "recoil"
import { chooseTargetState, selectedTargetsState, targetTableState } from "../../../states"
import { ChartProps } from "../../../types"
import { getColorScheme, getSelectedColorScheme } from "../../util/colorSchemeUtils"
import { checkUserSelection, modifyUserSelection } from "../../util/userSelectionUtils"

const pieSortValues = (a: number, b: number) => b - a

export default function SimpleBarChart({ xMax, yMax, margins }: ChartProps) {
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [chooseTarget, setChooseTarget] = useRecoilState(chooseTargetState)
    const [selectedTargets, setSelectedTargets] = useRecoilState(selectedTargetsState)

    const colorScheme = useMemo(
        () => getColorScheme(targetTable["value"].map((d) => d.key)),
        [targetTable]
    )
    const selectedColorScheme = useMemo(
        () => getSelectedColorScheme(targetTable["value"].map((d) => d.key)),
        [targetTable]
    )
    const xCenter = xMax / 2
    const yCenter = (yMax + margins.bottom) / 2

    return (
        <Group top={yCenter} left={xCenter}>
            <Pie
                data={targetTable["value"]}
                pieValue={(d) => d.value}
                pieSortValues={pieSortValues}
                outerRadius={Math.min(xMax, yMax) / 2}
            >
                {(pie) => {
                    return pie.arcs.map((arc, i) => {
                        const key = arc.data.key
                        const value = arc.data.value
                        const arcPath = pie.path(arc) ?? ""
                        return (
                            <Group key={i}>
                                <path
                                    d={arcPath}
                                    fill={
                                        checkUserSelection(selectedTargets, arc.data)
                                            ? selectedColorScheme(key)
                                            : colorScheme(key)
                                    }
                                    onClick={() => {
                                        setSelectedTargets(
                                            modifyUserSelection(
                                                selectedTargets,
                                                arc.data,
                                                chooseTarget
                                            )
                                        )
                                    }}
                                />
                            </Group>
                        )
                    })
                }}
            </Pie>
        </Group>
    )
}
