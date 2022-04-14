import { Box, VStack, Divider, Heading, Center, Text } from "@chakra-ui/react"
import { tableTitleState, tableDataState } from "../../states"
import { useRecoilState } from "recoil"

import ParentSize from "@visx/responsive/lib/components/ParentSize"

import Chart from "./ChartAxis"

const chartHeight = 400

const ChartRenderer = ({ minH }: any) => {
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState)
    const [tableData, setTableData] = useRecoilState(tableDataState)

    return (
        <Box p={6} w="full" minH={minH}>
            <VStack spacing={4} w="full" align="left">
                <Heading fontSize="xl">Visualization</Heading>
                <Divider />
                <Center>
                    <Heading fontSize={"xl"}>{tableTitle}</Heading>
                </Center>
                {tableData.length ? (
                    <ParentSize>
                        {({ width, height }) => <Chart width={width} height={chartHeight} />}
                    </ParentSize>
                ) : (
                    <Center minH={300}>
                        <Text fontSize={"xl"}>Please import data or load Demo!</Text>
                    </Center>
                )}
            </VStack>
        </Box>
    )
}

export default ChartRenderer
