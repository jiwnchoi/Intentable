import { Circle, LinePath } from "@visx/shape"
import { useMemo } from "react"
import { useRecoilState } from "recoil"
import { chooseTargetState, selectedTargetsState, targetTableState } from "../../../states"
import { ChartProps } from "../../../types"
import { getColorScheme, getSelectedColorScheme } from "../../util/colorSchemeUtils"
import { checkUserSelection, modifyUserSelection } from "../../util/userSelectionUtils"

export default function MultiLineChart({ xScale, yScale, margins }: ChartProps) {
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [chooseTarget, setChooseTarget] = useRecoilState(chooseTargetState)
    const [selectedTargets, setSelectedTargets] = useRecoilState(selectedTargetsState)

    const seriesList = useMemo(() => Object.keys(targetTable), [targetTable])
    const scaleWidth = xScale.bandwidth()

    const colorScheme = useMemo(() => getColorScheme(seriesList), [seriesList])
    const selectedColorScheme = useMemo(() => getSelectedColorScheme(seriesList), [seriesList])

    return (
        <>
            {seriesList.map((series, series_index) => {
                const seriesColor = colorScheme(series)
                const selectedSeriesColor = selectedColorScheme(series)
                return (
                    <>
                        <LinePath
                            data={targetTable[series]}
                            x={(d) => (xScale(d.key) ?? 0) + scaleWidth / 2}
                            y={(d) => yScale(d.value) ?? 0}
                            stroke={seriesColor}
                            strokeWidth={2}
                        />
                        {targetTable[series].map((d, i) => {
                            return (
                                <Circle
                                    key={i}
                                    r={checkUserSelection(selectedTargets, d) ? 10 : 5}
                                    cx={(xScale(d.key) ?? 0) + scaleWidth / 2}
                                    cy={yScale(d.value)}
                                    fill={
                                        checkUserSelection(selectedTargets, d)
                                            ? selectedSeriesColor
                                            : seriesColor
                                    }
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
            })}
        </>
    )
}
