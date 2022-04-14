import {
    GridItem,
    Text,
    Box,
    SimpleGrid,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    HStack,
    Input,
    Radio,
    Flex,
    VStack,
    Textarea,
} from "@chakra-ui/react"
import ChartRenderer from "./visualization"
import TableConfigureation from "./tableConfig"
import CaptionEditor from "./captionViewer"
import IntentList from "./inetntList"
import IntentEditor from "./intentEditor"

const Dashboard = () => (
    <Container maxW={"8xl"} m={4}>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(5, 1fr)" }} gap={8}>
            <GridItem colSpan={{ base: 1, lg: 2 }}>
                <Box bg="white" boxShadow="base" borderRadius={20} mb={8}>
                    <TableConfigureation />
                </Box>
                <Box bg="white" boxShadow="base" borderRadius={20} mb={8}>
                    <IntentEditor/>
                </Box>
                <Box bg="white" boxShadow="base" borderRadius={20}>
                    <IntentList />
                </Box>
            </GridItem>
            <GridItem colSpan={{ base: 1, lg: 3 }}>
                <Box bg="white" boxShadow="base" borderRadius={20}>
                    <ChartRenderer minH={400} />
                    <CaptionEditor />
                </Box>
            </GridItem>
        </Grid>
    </Container>
)

export default Dashboard
