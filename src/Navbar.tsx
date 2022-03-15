import {
    Box,
    Container,
    Heading,
    Stack,
    Text,
    Divider,
    Flex,
    Link,
    useColorModeValue,
} from "@chakra-ui/react";

export default function Navbar() {
    return (
        <Box
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
                <Text>Github</Text>
            </Container>
            <Divider />
        </Box>
    );
}
