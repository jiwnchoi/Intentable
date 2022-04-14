import { Bar, Pie } from "@visx/shape"
import { useRecoilState } from "recoil"
import { featureTableState, tableDataState, userSelectionState } from "../../states"
import { ChartProps, Selection, Element } from "../../types"
import { schemeCategory10 as nonSelectedColor } from "d3-scale-chromatic"
import { hsl } from "d3-color"
import { Group } from "@visx/group"
import { checkUserSelection, modifyUserSelection } from "../util/userSelectionUtils"

const selectedColor = nonSelectedColor.map((c) => hsl(hsl(c).h, hsl(c).s, hsl(c).l * 1.5))

const pieSortValues = (a: number, b: number) => b - a

export default function SimpleBarChart({ xMax, yMax, margins }: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [featureTable, setFeatureTable] = useRecoilState(featureTableState)

    const xCenter = xMax / 2
    const yCenter = yMax / 2

    return (
        <Group top={yCenter} left={xCenter}>
            <Pie
                data={tableData}
                pieValue={(d) => d.value as number}
                pieSortValues={pieSortValues}
                outerRadius={Math.min(xMax, yMax) / 2}
            >
                {(pie) => {
                    return pie.arcs.map((arc, i) => {
                        const characteristic = arc.data.characteristic as string
                        const value = arc.data.value as number
                        const key = "value"
                        const arcPath = pie.path(arc) ?? ""
                        return (
                            <Group key={i}>
                                <path
                                    d={arcPath}
                                    fill={
                                        checkUserSelection(
                                            userSelection,
                                            key,
                                            characteristic,
                                            value
                                        )
                                            ? String(selectedColor[i])
                                            : (nonSelectedColor[i] as string)
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
                            </Group>
                        )
                    })
                }}
            </Pie>
        </Group>
    )
}
