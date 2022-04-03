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
            marginLeft={4}
            marginRight={4}
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
        >
            <Container
                as={Stack}
                maxW={"8xl"}
                py={4}
                direction={"row"}
                justify={"space-between"}
                alignItems={"left"}
                spacing={4}
            >
                <Heading size={"md"}>📊 Chart Tell Me!</Heading>
                <Link href="https://github.com" isExternal>
                    <Center>
                        Github
                        <ExternalLinkIcon marginLeft="4px" marginBottom="4px" />
                    </Center>
                </Link>
            </Container>
            <Divider />
        </Box>
    )
}
