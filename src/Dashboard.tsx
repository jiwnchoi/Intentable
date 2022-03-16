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
} from "@chakra-ui/react";
import ChartRenderer from "./chart/ChartRenderer";
import TableConfigureation from "./table/TableConfigureation";
import CaptionEditor from "./caption/CaptionEditor";
import EntitySelector from "./chart/EntitySelector";

const Dashboard = () => (
    <Container maxW={"full"} m={4}>
        <Grid
            templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
            gap={8}
        >
            <GridItem bg="white" boxShadow="base" borderRadius={20}>
                <TableConfigureation />
            </GridItem>
            <GridItem
                bg="white"
                boxShadow="base"
                borderRadius={20}
                maxW={"full"}
                colSpan={{ base: 1, lg: 2 }}
            >
                <ChartRenderer minH={400} />
                <EntitySelector minH={300} />
            </GridItem>
            <GridItem bg="white" boxShadow="base" borderRadius={20}>
                <CaptionEditor></CaptionEditor>
            </GridItem>
        </Grid>
    </Container>
);

export default Dashboard;
