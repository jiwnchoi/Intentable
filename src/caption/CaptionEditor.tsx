import {
    Textarea,
    Box,
    VStack,
    Heading,
    Divider,
    Button,
    Flex,
    Text,
    Spacer,
} from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import {
    userSelectionState,
    captionState,
    tableTitleState,
    tableValueInfoState,
    chartTypeState,
    tableDataState,
    featureTableState,
    hasOverviewState
} from "../../states"
import { Element } from "../../types"

const CaptionEditor = (props: any) => {
    const [caption, setCaption] = useRecoilState(captionState)
    const [userSelection, setUserSelection] = useRecoilState(userSelectionState)
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState)
    const [tableValueInfo, setTableValueInfo] = useRecoilState(tableValueInfoState)
    const [chartType, setChartType] = useRecoilState(chartTypeState)
    const [tableData, setTableData] = useRecoilState(tableDataState)
    const [featureTable, setFeatureTable] = useRecoilState(featureTableState)
    const [hasOverview, setHasOverview] = useRecoilState(hasOverviewState)
    const [sourceSequence, setSourceSequence] = useState("")

    const predict = async () => {
        const get = await axios.get("http://localhost:5600/predict?caption=" + sourceSequence)
        let predicted_caption = get.data.predict
        setCaption(predicted_caption)
    }

    const automatic = async () => {
        let caption = `Score: <chart_type>${chartType}</chart_type><title>${tableTitle}</title><value_info>${tableValueInfo}</value_info><selection>`
        let allFeatures : string[] = []
        console.log(featureTable)
        for (const key in featureTable){
            console.log()
            allFeatures = allFeatures.concat(Object.values(featureTable[key]).map((d) => d.get()))
        }
        const request_elements = {
            caption: caption,
            elements: allFeatures
        }
        console.log(request_elements)
        const post = await axios.post("http://localhost:5600/automatic", request_elements)
        const predicted_caption : string = post.data.predict
        console.log(predicted_caption)
        setCaption(predicted_caption)
    }

    useEffect(() => {
        let caption = `Generate: <chart_type>${chartType}</chart_type><title>${tableTitle}</title><value_info>${tableValueInfo}</value_info><selection>`
        caption += hasOverview ? `<selection_item>overall</selection_item>` : ""
        caption += `${userSelection.map((item: Element) => item.get()).join("")}`
        caption += `</selection>`
        caption = caption.replace("arc", "pie")
        console.log(caption)
        setSourceSequence(caption)
    }, [tableData, chartType, tableTitle, tableValueInfo, userSelection])

    useEffect(() => {
        setCaption("")
    }, [tableData])

    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Flex verticalAlign={"center"}>
                    <Heading mt={1} fontSize="xl">
                        Caption
                    </Heading>
                    <Spacer />
                    <Button
                        size={"md"}
                        onClick={automatic}
                        bg={"gray.500"}
                        color={"white"}
                        variant="solid"
                        mr={1}
                        isDisabled={userSelection.length ? true : false}
                    >
                        Automatic Generation
                    </Button>
                    <Button
                        size={"md"}
                        onClick={predict}
                        bg={"gray.500"}
                        color={"white"}
                        variant="solid"
                        ml={1}
                    >
                        Manual Generation
                    </Button>
                </Flex>
                <Divider />
                <Box minH={200}>{caption}</Box>
            </VStack>
        </Box>
    )
}

export default CaptionEditor