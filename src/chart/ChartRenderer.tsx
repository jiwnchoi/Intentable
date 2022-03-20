import { Box, VStack, Divider, Heading, Center, Text } from "@chakra-ui/react";
import {
    tableValueInfoState,
    tableTitleState,
    tableDataState,
    userSelectionState,
} from "../../states";
import { useRecoilState } from "recoil";

import ParentSize from "@visx/responsive/lib/components/ParentSize";

import Chart from "./ChartAxis";
import { Group } from "@visx/group";

const chartHeight = 400;


const ChartRenderer = ({ minH }: any) => {
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState);
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const [tableValueInfo, setTableValueInfo] =
        useRecoilState(tableValueInfoState);
    
    const [userSelection, setUserSelection] =
        useRecoilState(userSelectionState);

    return (
        <Box p={6} w="full" minH={minH}>
            <VStack spacing={4} w="full" align="left">
                <Heading fontSize="xl">Visualization</Heading>
                <Divider />
                <Center>
                    <Heading fontSize={"lg"}>{tableTitle}</Heading>
                </Center>
                {tableData.length ? (
                    <ParentSize>
                        {({ width, height }) => (
                            <Chart width={width} height={chartHeight} />
                        )}
                    </ParentSize>
                ) : (
                    <Center minH={300}>
                        <Text fontSize={"xl"}>
                            Please import data or load Demo!
                        </Text>
                    </Center>
                )}
            </VStack>
        </Box>
    );
};

export default ChartRenderer;
