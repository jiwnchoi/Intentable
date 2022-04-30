import { Box, VStack, Heading, Spacer, Divider, Flex } from "@chakra-ui/react"
import { SelectedIntent } from "../../types"
import { selectedIntentsState } from "../../states"
import { useRecoilState } from "recoil"
import IntentObject from "./intentObject"


export default function IntentList({ minH }: any) {
    const [intents, setIntents] = useRecoilState(selectedIntentsState)


    return (
        <Box mt={4} minH={minH}>
            <VStack spacing={4} align="left">
                <Flex verticalAlign={"center"}>
                        Created Intents
                    <Spacer />
                </Flex>
                {intents.map((intent: SelectedIntent) => (
                    <IntentObject key={intent.id} intent={intent} />
                ))}
            </VStack>
        </Box>
    )
}
