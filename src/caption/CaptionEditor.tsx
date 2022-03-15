import { Textarea, Box, VStack, Heading, Divider, Button, Flex, Text} from "@chakra-ui/react"

const CaptionEditor= (props : any) => {

    const placeholser = "lorem ipsum dolor sit amet"

    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Caption</Heading>
                    

                <Divider />
                <Textarea minH={200} placeholder={placeholser} />
            </VStack>
        </Box>
    );
}

export default CaptionEditor