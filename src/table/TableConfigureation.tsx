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
    Center,
    Button,
} from "@chakra-ui/react";

import  { useState } from 'react';



const TableConfigureation = () => {
    
    const fileTypes = [ "CSV" ]
    const [file, setFile] = useState(null)
    const handleChange = (file : any) => {
        console.log(file)
        setFile(file)
    }



    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Data Configuration</Heading>
                <Divider />
                <Box>
                    <Text>Import Data</Text>
                    <Center
                        minH="150px"
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                    >
                        <Text color="gray.400">Click or Drop .csv File</Text>
                    </Center>
                </Box>
                <FormControl>
                    <FormLabel htmlFor="title">Title</FormLabel>
                    <Input
                        id="title"
                        placeholder="e.g. Number of monthly active Facebook users worldwide as of 4th quarter 2021"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="value-information">
                        Value Information
                    </FormLabel>
                    <Input
                        id="value-information"
                        placeholder="e.g. Percentage of people, Value in millions"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="chart-type">Chart Type</FormLabel>
                    <RadioGroup defaultValue="bar" id="chart-type">
                        <HStack spacing={4}>
                            <Radio value="bar">Bar</Radio>
                            <Radio value="line">Line</Radio>
                            <Radio value="pie">Pie</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="bar-type">Bar Type</FormLabel>
                    <RadioGroup defaultValue="grouped" id="bar-type">
                        <HStack spacing={4}>
                            <Radio value="grouped">Grouped</Radio>
                            <Radio value="stacked">Stacked</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                <Button colorScheme="blue" variant="outline">
                    Load Random Demo
                </Button>
                <Button colorScheme="blue">Draw Chart</Button>
            </VStack>
        </Box>
    );
};

export default TableConfigureation;
