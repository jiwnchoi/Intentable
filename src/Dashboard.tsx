import {
    Box,
    Text,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    VStack,
} from "@chakra-ui/react";
import ChartRenderer from "./chart/ChartRenderer";
import TableConfigureation from "./table/TableConfigureation"
const Dashboard = () => (
    <Box p={4}>
        <Grid
            w="7xl"
            h="80vh"
            templateColumns="repeat(3, 1fr)"
            templateRows="repeat(3, 1fr)"
            gap={8}
        >
            <GridItem
                rowSpan={3}
                colSpan={1}
                bg="white"
                borderRadius={20}
                boxShadow="base"
            >   
                <TableConfigureation />
            </GridItem>
            <GridItem
                rowSpan={2}
                colSpan={2}
                bg="white"
                borderRadius={20}
                boxShadow="base"
                p={6}
            >
                <Heading fontSize="xl">Chart</Heading>
                <ChartRenderer></ChartRenderer>
            </GridItem>
            <GridItem
                rowSpan={1}
                colSpan={2}
                bg="white"
                borderRadius={20}
                boxShadow="base"
                p={6}
            >
                <Heading fontSize="xl">Predicted Caption</Heading>
            </GridItem>
        </Grid>
    </Box>
);

export default Dashboard;
