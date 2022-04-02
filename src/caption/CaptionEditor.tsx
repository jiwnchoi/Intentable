import {
    Textarea,
    Box,
    VStack,
    Heading,
    Divider,
    Button,
    Flex,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
    userSelectionState,
    captionState,
    tableTitleState,
    tableValueInfoState,
    chartTypeState,
    tableDataState,
} from "../../states";
import { Element } from "../../types";

const CaptionEditor = (props: any) => {
    const [caption, setCaption] = useRecoilState(captionState);
    const [userSelection, setUserSelection] =
        useRecoilState(userSelectionState);
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState);
    const [tableValueInfo, setTableValueInfo] =
        useRecoilState(tableValueInfoState);
    const [chartType, setChartType] = useRecoilState(chartTypeState);
    const [tableData, setTableData] = useRecoilState(tableDataState);
    const [sourceSequence, setSourceSequence] = useState("");

    const predict = async () => {
        const get = await axios.get(
            "http://localhost:5600/predict?caption=" + sourceSequence
        );
        let caption = get.data.predict;
        setCaption(caption);
    };

    useEffect(() => {
        console.log(userSelection)
        let caption = `Generate: <chart_type>${chartType}</chart_type><title>${tableTitle}</title><value_info>${tableValueInfo}</value_info><selection>`
        caption += `${userSelection.map((item: Element) => item.get()).join("")}`
        caption += `</selection>`
        caption = caption.replace("arc","pie")
        console.log(caption)
        setSourceSequence(caption);
    }, [chartType, tableTitle, tableValueInfo, userSelection]);

    useEffect(() => {
        setCaption("");
    }, [tableData])

    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Caption</Heading>

                <Divider />
                {/* <Box>{sourceSequence}</Box> */}
                <Button onClick={predict} colorScheme="blue" variant="solid">
                    Generate
                </Button>
                <Box minH={200}>{caption}</Box>
            </VStack>
        </Box>
    );
};

export default CaptionEditor;
