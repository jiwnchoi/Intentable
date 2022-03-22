import {
    Box,
    Text,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    VStack,
    Center,
    Button,
} from "@chakra-ui/react";
import axios from "axios";

import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    tableTitleState,
    tableValueInfoState,
    tableDataState,
    chartTypeState,
    rowTypeState,
    barGroupedState,
} from "../../states";
import { fetchDemo } from "../../types";



const TableConfigureation = () => {
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState);
    const [valueInfo, setValueInfo] =
        useRecoilState(tableValueInfoState);
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const [chartType, setChartType] = useRecoilState(chartTypeState);
    const [rowType, setRowType] = useRecoilState(rowTypeState);
    const [barGrouped, setBarGrouped] = useRecoilState(barGroupedState);
    const [columnNumber, setColumnNumber] = useState(2);

    async function handleFetch() {
        const get = await axios.get("http://localhost:5600/demo");
        const data: fetchDemo = get.data;

        setTableTitle(data.title);
        setValueInfo(data.value_info);
        setRowType(data.row_type);
        if (data.chart_type == "<simplebar>") {
            setChartType("bar");
        } else if (data.chart_type.includes("line")) {
            setChartType("line");
        } else if (data.chart_type.includes("pie")) {
            setChartType("arc");
        } else if (data.chart_type == "<groupedbar>") {
            setChartType("bar");
            setBarGrouped(true);
        } else if (data.chart_type == "<stackedbar>") {
            setChartType("bar");
            setBarGrouped(false);
        }
        console.log(data.title, data.table)
        const cardinality = Object.keys(data.table[0]).length;
        setTableData(data.table);
        setColumnNumber(cardinality);
    }

    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Data Configuration</Heading>
                <Divider />
                <Button colorScheme="blue" onClick={handleFetch} variant="solid">
                    Load Random Demo
                </Button>
                <Box>
                    <Text>Import Data</Text>
                    <Center
                        minH="150px"
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                    >
                        <Text color="gray.400">Click or Drop .csv File</Text>
                    </Center>
                </Box>
                <FormControl>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id="title"
                        placeholder="e.g. Number of monthly active Facebook users worldwide as of 4th quarter 2021"
                        onChange={(e) => setTableTitle(e.target.value)}
                        value={tableTitle}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="value-Info">
                        Value Information 
                    </FormLabel>
                    <Input
                        id="value-Info"
                        placeholder="e.g. Percentage of people, Value in millions"
                        onChange={(e) => setValueInfo(e.target.value)}
                        value={valueInfo}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="chart-type">Chart Type</FormLabel>
                    <RadioGroup value={chartType} id="chart-type">
                        <HStack spacing={4}>
                            <Radio
                                value="bar"
                                onChange={(e) => setChartType("bar")}
                            >
                                Bar
                            </Radio>
                            <Radio
                                value="line"
                                onChange={(e) => setChartType("line")}
                            >
                                Line
                            </Radio>
                            {columnNumber < 3 && tableData.length < 11 ? (
                                <Radio
                                    value="arc"
                                    onChange={(e) => setChartType("arc")}
                                >
                                    Pie
                                </Radio>
                            ) : null}
                        </HStack>
                    </RadioGroup>
                </FormControl>
                {chartType == "bar" && columnNumber > 2 ? (
                    <FormControl>
                        <FormLabel htmlFor="bar-type">Bar Type</FormLabel>
                        <RadioGroup
                            defaultValue={barGrouped ? "grouped" : "stacked"}
                            id="bar-type"
                        >
                            <HStack spacing={4}>
                                <Radio
                                    value="grouped"
                                    onChange={(e) => {
                                        setBarGrouped(true);
                                        console.log(barGrouped);
                                    }}
                                >
                                    Grouped
                                </Radio>
                                <Radio
                                    value="stacked"
                                    onChange={(e) => {
                                        setBarGrouped(false);
                                        console.log(barGrouped);
                                    }}
                                >
                                    Stacked
                                </Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                ) : null}
            </VStack>
        </Box>
    );
};

export default TableConfigureation;
