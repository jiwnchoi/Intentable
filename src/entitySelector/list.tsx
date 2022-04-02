import { Box, FormControl, FormLabel, Heading, Switch, Text } from "@chakra-ui/react";
import { Element } from "../../types";

export default function SelectionList({selection} : {selection: Element}) {
    return (
        <>
            <Heading fontSize={"lg"}>{selection.value}</Heading>
            <Text>{selection.row}</Text>
            <Text>{selection.column}</Text>
            <Text>{selection.feature}</Text>
        </>
    );
}
