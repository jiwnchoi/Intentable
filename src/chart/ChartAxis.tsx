import { useMemo } from "react";
import { Group } from "@visx/group";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { scaleBand, scaleLinear } from "@visx/scale";
import { useRecoilState } from "recoil";
import SimpleBarChart from "./SimpleBarChart";
import GroupedBarChart from "./GroupedBarChart";
import StackedBarChart from "./StackedBarChart";
import SimpleLineChart from "./SimpleLineChart";
import MultiLineChart from "./MultiLineChart";
import PieChart from "./PieChart";
import { chartTypeState, barGroupedState, tableDataState } from "../../states";
import type { Size, TableData, ChartProps } from "../../types";
import { schemeCategory10 as color } from "d3-scale-chromatic";
import Legends from "./Legends";

const getValue = (d: TableData) => d.value;
const getCharacteristic = (d: TableData) => d.characteristic;
const getAllValueList = (tableData: TableData[]) => {
    const values: number[] = [];
    for (let d of tableData)
        for (let key in d)
            if (key !== "characteristic") values.push(Number(d[key]));
    return values;
};
const getRowSumValueList = (tableData: TableData[]) => {
    const values: number[] = [];
    for (let row of tableData) {
        const rowValues = Object.values(row).filter(
            (value) => typeof value === typeof 1
        ) as number[];
        console.log(rowValues);
        values.push(rowValues.reduce((a, b) => a + b));
    }
    return values;
};

const margins = { top: 20, right: 20, bottom: 40, left: 40 };

export default function Charts({ width, height }: Size) {
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const [chartType, setChartType] = useRecoilState(chartTypeState);
    const [barGrouped, setBarGrouped] = useRecoilState(barGroupedState);

    const xMax = width - margins.left - margins.right;
    const yMax = height - margins.top - margins.bottom;

    const xScale = useMemo(
        () =>
            scaleBand<string>({
                range: [0, xMax],
                round: true,
                domain: tableData.map(getCharacteristic),
                padding: 0.2,
            }),
        [xMax, tableData]
    );
    const cardinality = Object.keys(tableData[0]).length;

    const yScale = useMemo(() => {
        const yScaleDomain =
            cardinality === 2 || (cardinality > 2 && barGrouped == true)
                ? [
                    Math.min(...getAllValueList(tableData)) > 0
                        ? Math.min(...getAllValueList(tableData)) * 0.7
                        : Math.min(...getAllValueList(tableData)) * 1.1,
                    Math.max(...getAllValueList(tableData)) * 1.1,
                ]
                : [
                    Math.min(...getRowSumValueList(tableData)) > 0
                        ? Math.min(...getRowSumValueList(tableData)) * 0.7
                        : Math.min(...getRowSumValueList(tableData)) * 1.1,
                    Math.max(...getRowSumValueList(tableData)) * 1.1,
                ];
        return scaleLinear<number>({
            range: [yMax, 0],
            round: true,
            domain: yScaleDomain,
        });
    }, [yMax, tableData, barGrouped]);

    return (
        <>
            <svg width={width} height={height}>
                <Group left={margins.left} top={margins.top}>
                    {chartType === "bar" && cardinality === 2 ? (
                        <SimpleBarChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "bar" && !barGrouped ? (
                        <StackedBarChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "bar" && barGrouped ? (
                        <GroupedBarChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "line" && cardinality === 2 ? (
                        <SimpleLineChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "line" ? (
                        <MultiLineChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : chartType === "arc" && cardinality === 2 ? (
                        <PieChart
                            xScale={xScale}
                            yScale={yScale}
                            xMax={xMax}
                            yMax={yMax}
                            margins={margins}
                        />
                    ) : null}
                    {chartType !== "arc" ? (
                        <>
                            <AxisLeft scale={yScale} top={margins.top} />
                            <AxisBottom
                                top={yMax + margins.top}
                                scale={xScale}
                                stroke="#000"
                                tickStroke="#000"
                                tickLabelProps={(d, i) => ({
                                    textAnchor: "middle",
                                    fontSize: 12,
                                })}
                            />
                        </>
                    ) : null}
                </Group>
            </svg>
            {chartType === "arc" ? (
                <Legends
                    keys={tableData.map(getCharacteristic)}
                    legendGlyphSize={15}
                />
            ) : null}
            {cardinality > 2 ? (
                <Legends
                    keys={Object.keys(tableData[0]).filter(
                        (d) => d !== "characteristic"
                    )}
                    legendGlyphSize={15}
                />
            ) : null}
        </>
    );
}
