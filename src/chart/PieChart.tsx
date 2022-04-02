import { Bar, Pie } from "@visx/shape"
import { useRecoilState } from "recoil"
import { featureTableState, tableDataState, userSelectionState } from "../../states"
import { ChartProps, Selection, Element } from "../../types"
import { schemeCategory10 as nonSelectedColor } from "d3-scale-chromatic"
import { hsl } from "d3-color"
import { Group } from "@visx/group"

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
                        const arcPath = pie.path(arc) ?? ""
                        return (
                            <Group key={i}>
                                <path
                                    d={arcPath}
                                    fill={
                                        userSelection.some(
                                            (d) => d.key === `value-${characteristic}-${value}`
                                        )
                                            ? String(selectedColor[i])
                                            : (nonSelectedColor[i] as string)
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
                                                    (d) =>
                                                        d.key !== `value-${characteristic}-${value}`
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
                            </Group>
                        )
                    })
                }}
            </Pie>
        </Group>
    )
}
