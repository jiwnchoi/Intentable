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
                <Box>
                    <Text>Import Data</Text>
                    <Box minH="150px" border="1px" borderColor="gray.200" borderRadius="md">
                        <Center>
                            <HStack>Center</HStack>
                        </Center>
                    </Box>
                </Box>
            </VStack>
        </Box>
    )
};

export default TableConfigureation;
