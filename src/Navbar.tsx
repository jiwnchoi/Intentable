import {
    Box,
    Container,
    Heading,
    Stack,
    Text,
    Divider,
    Flex,
    Center,
    Link,
    useColorModeValue,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"

export default function Navbar() {
    return (
        <Box
            marginLeft={2}
            marginRight={2}
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
        >
            <Container
                as={Stack}
                maxW={"8xl"}
                pt={3}
                pb={1}
                direction={"row"}
                justify={"space-between"}
                alignItems={"left"}
                spacing={2}
            >
                <Heading size={"md"} fontWeight="900">Intentable</Heading>
                <Link href="https://github.com/jason-choi/intentable" isExternal>
                    <Center>
                        Github
                        <ExternalLinkIcon marginLeft="4px" marginBottom="4px" />
                    </Center>
                </Link>
            </Container>
        </Box>
    )
}
