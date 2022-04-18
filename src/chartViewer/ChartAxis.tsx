import { useMemo } from "react"
import { Group } from "@visx/group"
import { AxisBottom, AxisLeft } from "@visx/axis"
import { scaleBand, scaleLinear } from "@visx/scale"
import { useRecoilState } from "recoil"
import SimpleBarChart from "./charts/SimpleBarChart"
import GroupedBarChart from "./charts/GroupedBarChart"
import StackedBarChart from "./charts/StackedBarChart"
import SimpleLineChart from "./charts/SimpleLineChart"
import MultiLineChart from "./charts/MultiLineChart"
import PieChart from "./charts/PieChart"
import { chartTypeState, targetTableState } from "../../states"
import type { Size, TargetTable } from "../../types"
import Legends from "./Legends"
import { getFirstCaptital } from "../util/labelUtils"

const getAllValueList = (targetTable: TargetTable): number[] => {
    return [...Object.values(targetTable).flat()].map((d) => d.value)
}
const getRowSumValueList = (targetTable: TargetTable) => {
    const seriesList = Object.keys(targetTable)
    const rowSums: number[] = []
    const rowLength: number = targetTable[seriesList[0]].length
    for (let i = 0; i < rowLength; i++) {
        let sum = 0
        seriesList.forEach((series) => {
            sum += targetTable[series][i].value
        })
        rowSums.push(sum)
    }
    return rowSums
}

const margins = { top: 10, right: 10, bottom: 40, left: 50 }

export default function Charts({ width, height }: Size) {
    const [targetTable, setTableData] = useRecoilState(targetTableState)
    const [chartType, setChartType] = useRecoilState(chartTypeState)

    const xMax = width - margins.left - margins.right
    const yMax = height - margins.top - margins.bottom
    const seriesList = useMemo(() => Object.keys(targetTable), [targetTable])
    const keyList = useMemo(() => targetTable[seriesList[0]].map((d) => d.key), [targetTable])
    const cardinality = useMemo(() => seriesList.length, [seriesList])

    const xScale = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xMax],
                round: true,
                domain: keyList,
                padding: 0.2,
            }),
        [xMax, keyList]
    )
    const xScaleCapital = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xMax],
                round: true,
                domain: keyList.map(getFirstCaptital),
                padding: 0.2,
            }),
        [xMax, keyList]
    )

    const getYScaleDomain = () => {
        if (chartType === "stacked_bar") {
            const rowSumMin = Math.min(...getRowSumValueList(targetTable))
            const rowSumMax = Math.max(...getRowSumValueList(targetTable))
            return [rowSumMin >= 0 ? 0 : rowSumMin, rowSumMax]
        } else {
            const allValueMin = Math.min(...getAllValueList(targetTable))
            const allValueMax = Math.max(...getAllValueList(targetTable))
            return [allValueMin >= 0 ? 0 : allValueMin, allValueMax]
        }
    }

    const yScale = useMemo(() => {
        const yScaleDomain = getYScaleDomain()
        return scaleLinear<number>({
            range: [yMax, 0],
            round: true,
            domain: yScaleDomain,
        })
    }, [targetTable, chartType])

    return (
        <>
            <svg width={width} height={height}>
                <Group left={margins.left} top={margins.top}>
                    {chartType === "bar" && cardinality === 1 ? (
                        <SimpleBarChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "stacked_bar" ? (
                        <StackedBarChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "grouped_bar" ? (
                        <GroupedBarChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "line" ? (
                        <SimpleLineChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "multi_line" ? (
                        <MultiLineChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "pie" ? (
                        <PieChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : null}
                    {chartType !== "pie" ? (
                        <>
                            <AxisLeft scale={yScale} top={margins.top} />
                            <AxisBottom
                                top={yMax + margins.top}
                                scale={xScaleCapital}
                                stroke="#000"
                                tickStroke="#000"
                                tickLabelProps={(d, i) => {
                                    let l = 0
                                    if (String(d).length > 20 && i % 2 == 0) l = 15

                                    return {
                                        // transform: `translate(0, ${l})`,
                                        textAnchor: "middle",
                                        fontSize: 12,
                                    }
                                }}
                            />
                        </>
                    ) : null}
                </Group>
            </svg>
            {chartType === "pie" ? (
                <Legends keys={keyList.map(getFirstCaptital)} legendGlyphSize={14} />
            ) : null}
            {cardinality > 1 ? (
                <Legends keys={seriesList.map(getFirstCaptital)} legendGlyphSize={14} />
            ) : null}
        </>
    )
}
