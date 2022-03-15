import { Box, Heading, VStack, Divider } from "@chakra-ui/react";

export default function EntitySelector(){


    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Selected Entity</Heading>
                <Divider />

            </VStack>
        </Box>
    );
}