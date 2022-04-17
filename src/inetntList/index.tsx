import { Box, VStack, Heading, Spacer, Divider, Flex } from "@chakra-ui/react"
import { SelectedIntent } from "../../types"
import { selectedIntentsState } from "../../states"
import { useRecoilState } from "recoil"
import IntentObject from "./intentObject"


export default function IndentList({ minH }: any) {
    const [intents, setIntents] = useRecoilState(selectedIntentsState)


    return (
        <Box p={6} minH={minH}>
            <VStack spacing={4} align="left">
                <Flex verticalAlign={"center"}>
                    <Heading mt={1} fontSize="xl">
                        Selected Indent
                    </Heading>
                    <Spacer />
                </Flex>
                <Divider />
                {intents.map((intent: SelectedIntent) => (
                    <IntentObject key={intent.id} intent={intent} />
                ))}
            </VStack>
        </Box>
    )
}
