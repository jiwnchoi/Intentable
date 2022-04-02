import {
    Box,
    Heading,
    VStack,
    Divider,
    Button,
    Flex,
    Spacer,
    Alert,
    AlertIcon,
    AlertTitle,
    HStack,
} from "@chakra-ui/react"
import { userSelectionState } from "../../states"
import { useRecoilState } from "recoil"
import SelectionList from "./list"
import { Element } from "../../types"
import { AddIcon } from "@chakra-ui/icons"
import { useEffect, useState } from "react"

export default function EntitySelector({ minH }: any) {
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [isAlert, setIsAlert] = useState(false)

    useEffect(() => {
        const length = userSelection.filter((e) => e.type !== "overall").length
        if (length > 3) {
            setUserSelection(userSelection.slice(0, userSelection.length - 1))
            setIsAlert(true)
            setTimeout(() => {
                setIsAlert(false)
            }, 3000)
        }
    }, [userSelection])

    const includeOverall = () => {
        if (userSelection.length > 0 && userSelection[0].key === "overall") {
            setUserSelection(userSelection.filter((d) => d.key !== "overall"))
        } else {
            const overallSelection = new Element("overall", "overall", 0, "", "", "overall")
            setUserSelection([overallSelection, ...userSelection])
        }
    }

    const isOverallSelected = () => {
        return userSelection.length > 0 && userSelection[0].key === "overall"
    }

    return (
        <Box p={6} minH={minH}>
            <Heading fontSize="xl" mb={4}>
                Selected Element
            </Heading>
            <Spacer />

            <Divider mb={4} />
            <Button
                // leftIcon={<AddIcon w={4} h={4} />}
                bg={isOverallSelected() ? "gray.500" : "gray.100"}
                color={isOverallSelected() ? "gray.100" : "gray.500"}
                fontSize={"xl"}
                onClick={includeOverall}
                w="full"
                borderRadius={20}
                minH={81}
                mb={4}
            >
                {isOverallSelected() ? "Overview" : "Add Overview"}
            </Button>
            {isAlert ? (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>You can select up to three elements!</AlertTitle>
                </Alert>
            ) : null}
            <VStack>
                {userSelection
                    .filter((d) => d.type !== "overall")
                    .map((selection, index) => (
                        <SelectionList selection={selection} />
                    ))}
            </VStack>
        </Box>
    )
}
