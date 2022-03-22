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
} from "../../states";
{/* <is_overall>overall</is_overall>
<chart_type>line</chart_type>
<title>consumer price index (cpi) of housing and utilities in south africa from march 2019 to march 2020</title>
<value_info>consumer price index (dec 2016 = 100)</value_info>
<selecttion>
    <name>row : 0</name>
    <entity>row : 0, column : 0</entity>
    <name>row : 1</name>
    <entity>row : 1, column : 0</entity>
</selecttion> */}
const CaptionEditor = (props: any) => {
    const [caption, setCaption] = useRecoilState(captionState);
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState);
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState);
    const [tableValueInfo, setTableValueInfo] = useRecoilState(
        tableValueInfoState
    );
    const [chartType, setChartType] = useRecoilState(chartTypeState);
    const [sourceSequence, setSourceSequence] = useState("");
    
    const predict = async () => {
        const get = await axios.get(
            "http://localhost:5600/predict?caption=" + sourceSequence
        )
        console.log(get.data)
        setCaption(get.data.predict);
    }


    useEffect(() => {
        const caption = 
        `<is_overall>overall</is_overall><chart_type>${chartType.replace("arc","pie")}</chart_type>` 
        + `<title>${tableTitle}</title><value_info>${tableValueInfo}</value_info><selecttion>` 
        + `</selecttion>`;
        setSourceSequence(caption);
    }, [chartType, tableTitle, tableValueInfo, userSelection]);


    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Caption</Heading>

                <Divider />
                <Button onClick={predict} colorScheme="blue" variant="solid">
                    Generate
                </Button>
                <Textarea minH={200} value={caption}> </Textarea>
            </VStack>
        </Box>
    );
};

export default CaptionEditor;
