import {
    Box,
    Container,
    Stack,
    Text,
    Link,
    Divider,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react"

export default function Footer({ position, bottom }: any) {
    return (
        <Box
            marginLeft={4}
            position={position}
            left={0}
            right={0}
            bottom={bottom}
            bg={useColorModeValue("gray.50", "gray.900")}
            color={useColorModeValue("gray.700", "gray.200")}
        >
            <Divider />
            <Container
                as={Stack}
                maxW={"full"}
                py={4}
                direction={"column"}
                justify={"left"}
                alignItems={"left"}
                spacing={1}
            >
                <Link href="https://idclab.skku.edu">
                    <Flex>
                        <Text fontFamily="Rajdhani" fontWeight="bold" fontSize="xl">
                            IDC
                        </Text>
                        <Text fontFamily="Rajdhani" fontSize="xl">
                            Lab
                        </Text>
                    </Flex>
                </Link>

                <Link href="https://skkuu.edu">
                    <Text>Sungkyunkwan University</Text>
                </Link>
                <Link href="https://cs.skku.edu">
                    <Text>College of Computing and Informatics</Text>
                </Link>
            </Container>
        </Box>
    )
}
