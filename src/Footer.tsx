import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
        >
            <Container
                as={Stack}
                maxW={"7xl"}
                py={4}
                direction={"column"}
                justify={"left"}
                alignItems={"left"}
                spacing={1}
            >
                <Flex>
                    <Text fontFamily="Rajdhani" fontWeight="bold" fontSize="xl">
                        IDC
                    </Text>
                    <Text fontFamily="Rajdhani" fontSize="xl">
                        Lab
                    </Text>
                </Flex>
                <Text>Sungkyunkwan University</Text>
                <Text>College of Computing and Informatics</Text>
            </Container>
        </Box>
    );
}
