import {
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Spacer,
    Textarea,
    VStack,
} from "@chakra-ui/react"
import axios from "axios"
import { useState } from "react"
import { useRecoilState } from "recoil"
import {
    chartTypeState,
    goldenCaptionState,
    rowTypeState,
    selectedIntentsState,
    tableTitleState,
    tableValueInfoState,
    targetTableState,
    goldenRecipeState
} from "../../states"
import { Features, FetchDemo, SelectedTarget, TargetTable } from "../../types"

const TableConfigureation = () => {
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState)
    const [valueInfo, setValueInfo] = useRecoilState(tableValueInfoState)
    const [chartType, setChartType] = useRecoilState(chartTypeState)
    const [rowType, setRowType] = useRecoilState(rowTypeState)
    const [selectedIntents, setSelectedIntents] = useRecoilState(selectedIntentsState)
    const [goldenCaption, setGoldenCaption] = useRecoilState(goldenCaptionState)
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [goldenRecipe, setGoldenRecipe] = useRecoilState(goldenRecipeState)
    const [columnNumber, setColumnNumber] = useState(0)
    const [rowNumber, setRowNumber] = useState(0)

    async function handleFetch(link: string) {
        const location = String(document.location).replace("3000","5600")
        const get = await axios.get(`${location}${link}`)
        const data: FetchDemo = get.data
        const columnNames: string[] = Object.keys(data.table[0])
            .filter((d) => d !== "characteristic")
            .map((d) => String(d))
        setGoldenRecipe(data.recipe)
        setRowNumber(data.table.length)
        setColumnNumber(columnNames.length)
        setChartType(data.recipe.chart_type)
        setGoldenCaption(data.caption)
        setTableTitle(data.recipe.title)
        setValueInfo(data.recipe.unit)
        setRowType(data.row_type)
        setSelectedIntents([])

        const targetTable: TargetTable = {}

        const featureTable: { [series: string]: Features } = {}
        for (const columnName of columnNames) {
            // Calculating Column-wise Feature
            const values = data.table.map((d) => d[columnName])

            const max = values.reduce((a, b) => {
                return a > b ? a : (b as number)
            })
            const min = values.reduce((a, b) => {
                return a < b ? a : (b as number)
            })
            featureTable[columnName] = {
                max: max as number,
                min: min as number,
                recent: String(data.table[data.table.length - 1].characteristic),
                past: String(data.table[0].characteristic),
            }
            // Converting to Selected Target
            for (const row of data.table) {
                const value = row[columnName] as number
                const series = columnName
                const key = String(row["characteristic"])

                const target = new SelectedTarget(value, key, series)

                if (featureTable[series].max == value) {
                    if (!target.feature) target.feature = ["max"]
                    else target.feature.push("max")
                }
                if (featureTable[series].min == value) {
                    if (!target.feature) target.feature = ["min"]
                    else target.feature.push("min")
                }
                if (rowType == "DATE" && featureTable[series].recent == key) {
                    if (!target.feature) target.feature = ["recent"]
                    else target.feature.push("recent")
                }
                if (rowType == "DATE" && featureTable[series].past == key) {
                    if (!target.feature) target.feature = ["past"]
                    else target.feature.push("past")
                }

                if (targetTable[series] === undefined) {
                    targetTable[series] = [target]
                } else {
                    targetTable[series].push(target)
                }
            }
        }
        setTargetTable(targetTable)
    }

    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Table Configuration</Heading>
                <Divider />
                <Flex w="full">
                    <Button
                        mr={1}
                        w="full"
                        onClick={() => {
                            handleFetch("get_from_test_set")
                        }}
                    >
                        Load Random Demo
                    </Button>
                    <Spacer />
                    <Button ml={1} w="full" disabled={true} onClick={() => handleFetch("get_from_test_set")}>
                        Upload Table
                    </Button>
                </Flex>

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
                    <FormLabel htmlFor="unit">Unit</FormLabel>
                    <Input
                        id="unit"
                        placeholder="e.g. Percentage of people, Value in millions"
                        onChange={(e) => setValueInfo(e.target.value)}
                        value={valueInfo}
                        resize="none"
                    />
                </FormControl>
                <Flex>
                    <FormControl>
                        <FormLabel htmlFor="chart-type">Chart Type</FormLabel>
                        <RadioGroup
                            value={chartType
                                .replace("multi_", "")
                                .replace("grouped_", "")
                                .replace("stacked_", "")}
                            id="chart-type"
                        >
                            <HStack spacing={4}>
                                <Radio
                                    value="bar"
                                    onChange={(e) =>
                                        setChartType(columnNumber === 1 ? "bar" : "grouped_bar")
                                    }
                                >
                                    Bar
                                </Radio>
                                <Radio
                                    value="line"
                                    onChange={(e) =>
                                        setChartType(columnNumber === 1 ? "line" : "multi_line")
                                    }
                                >
                                    Line
                                </Radio>
                                <Radio
                                    value="pie"
                                    onChange={(e) => setChartType("pie")}
                                    disabled={columnNumber === 1 && rowNumber < 11 ? false : true}
                                >
                                    Pie
                                </Radio>
                            </HStack>
                        </RadioGroup>
                    </FormControl>
                    {["grouped_bar", "stacked_bar"].includes(chartType) ? (
                        <FormControl>
                            <FormLabel htmlFor="bar-type">Bar Type</FormLabel>
                            <RadioGroup
                                defaultValue={chartType.includes("grouped") ? "grouped" : "stacked"}
                                id="bar-type"
                            >
                                <HStack spacing={4}>
                                    <Radio
                                        value="grouped"
                                        onChange={(e) => {
                                            setChartType("grouped_bar")
                                        }}
                                    >
                                        Grouped
                                    </Radio>
                                    <Radio
                                        value="stacked"
                                        onChange={(e) => {
                                            setChartType("stacked_bar")
                                        }}
                                    >
                                        Stacked
                                    </Radio>
                                </HStack>
                            </RadioGroup>
                        </FormControl>
                    ) : null}
                </Flex>
            </VStack>
        </Box>
    )
}

export default TableConfigureation
