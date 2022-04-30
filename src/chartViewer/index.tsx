import { Box, VStack, Heading, Center, Text } from "@chakra-ui/react"
import { tableTitleState, targetTableLoadedState, tableValueInfoState } from "../../states"
import { useRecoilState } from "recoil"

import ParentSize from "@visx/responsive/lib/components/ParentSize"

import Chart from "./ChartAxis"

const chartHeight = 200

const ChartRenderer = ({ minH }: any) => {
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState)
    const [targetTableLoaded, setTargetTableLoaded] = useRecoilState(targetTableLoadedState)
    const [valueInfo, setValueInfo] = useRecoilState(tableValueInfoState)

    return (
        <Box p={4} w="full" minH={minH}>
            <VStack spacing={4} w="full" align="left">
                <Heading fontSize="xl">Chart</Heading>
                {targetTableLoaded && tableTitle !== "" && valueInfo !== "" ? (
                    <>
                        <Center>
                            <Heading fontSize={"xl"}>{tableTitle}</Heading>
                        </Center>

                        <ParentSize>
                            {({ width, height }) => <Chart width={width} height={chartHeight} />}
                        </ParentSize>
                    </>
                ) : (
                    <Center minH={200}>
                        <Text fontSize={"xl"}>Please load table!</Text>
                    </Center>
                )}
            </VStack>
        </Box>
    )
}

export default ChartRenderer

