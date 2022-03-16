import React, { useEffect } from "react";
import { Box, VStack, Divider, Heading } from "@chakra-ui/react";
import { VegaLite } from "react-vega";
import {
    tableValueInfoState,
    tableTitleState,
    chartTypeState,
    tableDataState,
    barGroupedState,
} from "../../states";
import { useRecoilState } from "recoil";
import { useState, useLayoutEffect } from "react";

// function that splits sentence by half
function splitSentence(sentence: string): string[] {
    const words = sentence.split(" ");
    const half = Math.floor(words.length / 2);
    return [words.slice(0, half).join(" "), words.slice(half).join(" ")];
}

interface Size {
    width: number;
    height: number;
}
const ChartRenderer = (props: any) => {
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState);
    const [tableValueInfo, setTableValueInfo] =
        useRecoilState(tableValueInfoState);
    const [chartType, setChartType] = useRecoilState(chartTypeState);
    const [tableData, setTableData] = useRecoilState<any[]>(tableDataState);
    const [barGrouped, setBarGrouped] = useRecoilState(barGroupedState);
    const [vegaData, setVegaData] = useState([]);
    const [vegaSpec, setVegaSpec] = useState({});
    const [size, setSize] = useState<Size>();

    const resizeHanlder = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setSize({
            width: width,
            height: height,
        });
    };

    useEffect(() => {
        window.onresize = resizeHanlder;
    }, []);


    useEffect(() => {
        const spec: any = {
            title: splitSentence(tableTitle),
            width: "container",
            height: 300,
            reload: size,
            mark: chartType,
            transform: [{ sample: 10000 }],
            encoding: {
                x: {
                    field: "characteristic",
                    type: "nominal",
                    title: "",
                },
                y: {
                    field: "value",
                    type: "quantitative",
                    title: tableValueInfo,
                },
            },
            data: { name: "table" },
        };


        const data: any = [];
        for (let i = 0; i < tableData.length; i++) {
            const row = {
                characteristic: tableData[i].characteristic,
                value: tableData[i].value,
            };
            if (tableData[i].group) row.group = tableData[i].group;
            data.push(row);
        }
        if (data.length && Object.keys(data[0]).length > 2) {
            spec.encoding.color = { field: "group" };
            if (barGrouped) {
                spec.encoding.xOffset = { field: "group" };
            }
        }
        if (chartType == "arc") {
            spec.encoding = {
                theta: {
                    field: "value",
                    type: "quantitative",
                    title: "",
                },
                color: {
                    field: "characteristic",
                    type: "nominal",
                    title: tableValueInfo,
                },
            };
        }
        setVegaData(data);
        setVegaSpec(spec);
    }, [tableData, tableTitle, tableValueInfo, chartType, barGrouped, size]);

    return (
        <Box p={6} w="full">
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Visualization</Heading>
                <Divider />
                <VegaLite
                    spec={vegaSpec}
                    data={{ table: vegaData }}
                />
            </VStack>
        </Box>
    );
};

export default ChartRenderer;
