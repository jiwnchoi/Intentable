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
    Textarea,
    Flex,
    Spacer,
} from "@chakra-ui/react"
import axios from "axios"
import { gray } from "d3-color"

import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import {
    tableTitleState,
    tableValueInfoState,
    tableDataState,
    chartTypeState,
    rowTypeState,
    barGroupedState,
    featureTableState,
    userSelectionState,
} from "../../states"
import { fetchDemo, columnFeature } from "../../types"

const TableConfigureation = () => {
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState)
    const [valueInfo, setValueInfo] = useRecoilState(tableValueInfoState)
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [chartType, setChartType] = useRecoilState(chartTypeState)
    const [rowType, setRowType] = useRecoilState(rowTypeState)
    const [barGrouped, setBarGrouped] = useRecoilState(barGroupedState)
    const [featureTable, setFeatureTable] = useRecoilState(featureTableState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [columnNumber, setColumnNumber] = useState(0)
    const [rowNumber, setRowNumber] = useState(0)

    useEffect(() => {
        setFeatureTable({})
        setUserSelection([])
    }, [tableData])

    async function handleFetch(link: string) {
        const get = await axios.get(`http://localhost:5600/${link}`)
        const data: fetchDemo = get.data
        const columnNames: string[] = Object.keys(data.table[0]).filter(
            (d) => d !== "characteristic"
        )
        setRowNumber(data.table.length)
        setColumnNumber(columnNames.length)
        setTableData(data.table)
        console.log(data.table)
        if (data.chart_type == "bar") {
            setChartType("bar")
        } else if (data.chart_type.includes("line")) {
            setChartType("line")
        } else if (data.chart_type.includes("pie")) {
            setChartType("arc")
        }
        setTableTitle(data.title)
        setValueInfo(data.value_info)
        setRowType(data.row_type)

        const tmpFeatureTable: { [colname: string]: columnFeature } = {}
        for (const columnName of columnNames) {
            const characteristics = data.table.map((d) => d.characteristic)
            const values = data.table.map((d) => d[columnName])

            const max = values.reduce((a, b) => {
                return a > b ? a : b
            })
            const min = values.reduce((a, b) => {
                return a < b ? a : b
            })

            tmpFeatureTable[columnName] =
                data.row_type === "DATE"
                    ? ({
                          past: characteristics[0],
                          recent: characteristics[values.length - 1],
                          max: characteristics[values.indexOf(max)],
                          min: characteristics[values.indexOf(min)],
                      } as columnFeature)
                    : ({
                          max: characteristics[values.indexOf(max)],
                          min: characteristics[values.indexOf(min)],
                      } as columnFeature)
        }
        setFeatureTable(tmpFeatureTable)
    }

    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Data Configuration</Heading>
                <Divider />
                <Flex w="full">
                    <Button
                        mr={1}
                        w="full"
                        bg="gray.500"
                        color="white"
                        onClick={() => {
                            handleFetch("get_from_train_set")
                        }}
                        variant="solid"
                        shadow={"base"}
                    >
                        Load Train Set
                    </Button>
                    <Spacer />
                    <Button
                        ml={1}
                        w="full"
                        bg="gray.500"
                        color="white"
                        shadow={"base"}
                        onClick={() => handleFetch("get_from_test_set")}
                        variant="solid"
                    >
                        Load Test Set
                    </Button>
                </Flex>

                <Box>
                    <Text>Import Data</Text>
                    <Center minH="150px" border="1px" borderColor="gray.200" borderRadius="md">
                        <Text color="gray.400">Click or Drop .csv File</Text>
                    </Center>
                </Box>
                <FormControl>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Textarea
                        id="title"
                        placeholder="e.g. Number of monthly active Facebook users worldwide as of 4th quarter 2021"
                        onChange={(e) => setTableTitle(e.target.value)}
                        value={tableTitle}
                        resize="none"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="value-Info">Value Information</FormLabel>
                    <Textarea
                        id="value-Info"
                        placeholder="e.g. Percentage of people, Value in millions"
                        onChange={(e) => setValueInfo(e.target.value)}
                        value={valueInfo}
                        resize="none"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="chart-type">Chart Type</FormLabel>
                    <RadioGroup value={chartType} id="chart-type">
                        <HStack spacing={4}>
                            <Radio value="bar" onChange={(e) => setChartType("bar")}>
                                Bar
                            </Radio>
                            <Radio value="line" onChange={(e) => setChartType("line")}>
                                Line
                            </Radio>
                            <Radio
                                value="arc"
                                onChange={(e) => setChartType("arc")}
                                disabled={columnNumber < 3 && rowNumber < 11 ? false : true}
                            >
                                Pie
                            </Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                {chartType == "bar" && columnNumber > 2 ? (
                    <FormControl>
                        <FormLabel htmlFor="bar-type">Bar Type</FormLabel>
                        <RadioGroup defaultValue={barGrouped ? "grouped" : "stacked"} id="bar-type">
                            <HStack spacing={4}>
                                <Radio
                                    value="grouped"
                                    onChange={(e) => {
                                        setBarGrouped(true)
                                    }}
                                >
                                    Grouped
                                </Radio>
                                <Radio
                                    value="stacked"
                                    onChange={(e) => {
                                        setBarGrouped(false)
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
    )
}

export default TableConfigureation
