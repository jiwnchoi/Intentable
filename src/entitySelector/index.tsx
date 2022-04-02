import { Box, Heading, VStack, Divider, Button, Flex, Spacer } from "@chakra-ui/react"
import { userSelectionState } from "../../states"
import { useRecoilState } from "recoil"
import SelectionList from "./list"
import { Element } from "../../types"
import { AddIcon } from "@chakra-ui/icons"

export default function EntitySelector({ minH }: any) {
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const includeOverall = () => {
        if (userSelection.length > 0 && userSelection[0].key === "overall") {
            setUserSelection(userSelection.filter((d) => d.key !== "overall"))
        } else {
            const overallSelection = new Element("overall", "overall", 0, "", "", "overall")
            setUserSelection([overallSelection, ...userSelection])
        }
    }

    return (
        <Box p={6} minH={minH}>
            <Flex justifyContent={"space-between"} mb={4}>
                <Heading fontSize="xl">Selected Entity</Heading>
                <Spacer />

                <Button
                    leftIcon={<AddIcon w={2} h={2} />}
                    size="sm"
                    colorScheme="blue"
                    variant="solid"
                    onClick={includeOverall}
                >
                    Overview
                </Button>
            </Flex>

            <Divider />
            {userSelection.map((selection, index) => (
                <SelectionList selection={selection} />
            ))}
        </Box>
    )
}
