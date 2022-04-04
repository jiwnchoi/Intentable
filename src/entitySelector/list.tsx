import {
    Box,
    Center,
    Divider,
    FormControl,
    FormLabel,
    Heading,
    Switch,
    Text,
    VStack,
    Flex,
    Spacer,
} from "@chakra-ui/react"
import { Element } from "../../types"
import { schemeCategory10 } from "d3-scale-chromatic"
import { useRecoilState } from "recoil"
import { tableDataState, userSelectionState, chartTypeState } from "../../states"
import { scaleOrdinal } from "@visx/scale"
import { hsl } from "d3-color"

export default function SelectionList({ selection }: { selection: Element }) {
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [chartType, setChartType] = useRecoilState(chartTypeState)
    const keys = Object.keys(tableData[0]).filter((k) => k !== "characteristic")
    const selectedColor = schemeCategory10.map((c) => String(hsl(hsl(c).h, hsl(c).s, hsl(c).l * 1.5)))

    const ordinalColorScale = scaleOrdinal({
        domain: chartType !== 'arc' ? keys : tableData.map((d) => d.characteristic),
        range: [...schemeCategory10],
    })

    return (
        <VStack
            justifyContent={"space-between"}
            shadow="base"
            borderRadius={15}
            pt={2}
            pb={1}
            px={6}
            color={"white"}
            bg={ordinalColorScale(
                chartType !== "arc" ? selection.column : selection.row)}
            w="full"
            onClick={() => {
                const newSelection = userSelection.filter((e) => e.key !== selection.key)
                setUserSelection(newSelection)
            }}
        >
            <Flex w="full" justifyContent={"space-between"}>
                <Box>
                    <Text fontSize={"sm"}>
                        {selection.column !== "value" ? selection.column : ""} {selection.row}
                    </Text>
                </Box>
                <Spacer />
                <Box>
                    <Heading fontSize={"sm"}>{selection.feature}</Heading>
                </Box>
            </Flex>

            <Divider />
            <Heading fontSize={"md"}>{selection.value}</Heading>
        </VStack>

        // <>

        // </>
    )
}
