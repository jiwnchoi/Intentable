import React from "react";
import { Box, VStack, Divider, Heading } from "@chakra-ui/react";
import { VegaLite } from "react-vega";

const spec : any = {
    width: 400,
    height: 200,
    mark: "bar",
    encoding: {
        x: { field: "a", type: "ordinal" },
        y: { field: "b", type: "quantitative" },
    },
    data: { name: "table" }, // note: vega-lite data attribute is a plain object instead of an array
};

const barData = {
    table: [
        { a: "A", b: 28 },
        { a: "B", b: 55 },
        { a: "C", b: 43 },
        { a: "D", b: 91 },
        { a: "E", b: 81 },
        { a: "F", b: 53 },
        { a: "G", b: 19 },
        { a: "H", b: 87 },
        { a: "I", b: 52 },
    ],
};

export default function RenderVegaLite(props: any) {
    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Visualization</Heading>
                <Divider />
                <VegaLite
                    spec={spec}
                    data={barData}
                    // width={props.width}
                    // height={props.height}
                />
            </VStack>
        </Box>
    );
}
