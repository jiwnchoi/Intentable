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
import { schemeCategory10 as color } from "d3-scale-chromatic"
import { useRecoilState } from "recoil"
import { tableDataState, userSelectionState } from "../../states"
import { scaleOrdinal } from "@visx/scale"

export default function SelectionList({ selection }: { selection: Element }) {
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const keys = Object.keys(tableData[0]).filter((k) => k !== "characteristic")

    const ordinalColorScale = scaleOrdinal({
        domain: keys,
        range: [...color],
    })

    return (
        <VStack
            justifyContent={"space-between"}
            shadow="base"
            borderRadius={20}
            minH={50}
            pt={4}
            pb={2}
            px={6}
            color={"white"}
            bg={ordinalColorScale(selection.column)}
            w="full"
            onClick={() => {
                const newSelection = userSelection.filter((e) => e.key !== selection.key)
                setUserSelection(newSelection)
            }}
        >
            <Flex w="full" justifyContent={"space-between"}>
                <Box>
                    <Text fontSize={"md"}>
                        {selection.column !== "value" ? selection.column : ""} {selection.row}
                    </Text>
                </Box>
                <Spacer />
                <Box>
                    <Heading fontSize={"md"}>{selection.feature}</Heading>
                </Box>
            </Flex>

            <Divider />
            <Heading fontSize={"2xl"}>{selection.value}</Heading>
        </VStack>

        // <>

        // </>
    )
}
