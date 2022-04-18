import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    Spacer,
    Textarea,
    VStack,
} from "@chakra-ui/react"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import {
    captionState,
    chartTypeState,
    goldenCaptionState,
    selectedIntentsState,
    tableTitleState,
    tableValueInfoState,
    targetTableState,
    goldenRecipeState,
} from "../../states"
import { ChartType, Intent, Recipe } from "../../types"

const CaptionEditor = (props: any) => {
    const [chartType, setChartType] = useRecoilState(chartTypeState)
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState)
    const [valueInfo, setValueInfo] = useRecoilState(tableValueInfoState)
    const [selectedIntents, setSelectedIntents] = useRecoilState(selectedIntentsState)
    const [caption, setCaption] = useRecoilState(captionState)
    const [goldenCaption, setGoldenCaption] = useRecoilState(goldenCaptionState)
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [goldenRecipe, setGoldenRecipe] = useRecoilState(goldenRecipeState)
    const [recipe, setRecipe] = useState({})

    const [sourceSequence, setSourceSequence] = useState("")
    const [showDetail, setShowDetail] = useState(false)
    const predict = async () => {
        const location = String(document.location).replace("3000", "5600")
        const get = await axios.post(`${location}/predict`, {
            recipe: JSON.stringify(recipe),
        })
        let predicted_caption = get.data.predict
        setCaption(predicted_caption)
    }

    useEffect(() => {
        setCaption("")
    }, [targetTable])

    useEffect(() => {
        const tmp: Recipe = {
            chart_type: chartType.replace("arc", "pie") as ChartType,
            title: tableTitle,
            unit: valueInfo,
            intents: selectedIntents.map((intent) => intent.get() as Intent),
        }

        setRecipe(tmp)
    }, [chartType, tableTitle, valueInfo, targetTable, selectedIntents])

    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Flex verticalAlign={"center"} gap={2}>
                    <Heading mt={1} fontSize="xl">
                        Caption
                    </Heading>
                    <Spacer />
                    <Button size={"sm"} onClick={() => setShowDetail(!showDetail)}>
                        {showDetail ? "Hide Details" : "Show Details"}
                    </Button>
                    <Button
                        bg="gray.500"
                        color="white"
                        size={"sm"}
                        onClick={predict}
                        disabled={selectedIntents.length === 0 ? true : false}
                    >
                        Generate Captions
                    </Button>
                </Flex>
                <Divider />
                <Grid w="full" h="full" gap={8} templateColumns={"repeat(2, 1fr)"}>
                    <GridItem w="full" colSpan={showDetail ? 1 : 2}>
                        {showDetail ? (
                            <>
                                <Heading fontSize="lg" mb={2}>
                                    Predicted Caption
                                </Heading>
                            </>
                        ) : null}

                        {caption ? caption : `Select intent and press "Genretate Captions" button!`}
                    </GridItem>
                    {showDetail ? (
                        <>
                            <GridItem w="full">
                                <Heading fontSize="lg" mb={2}>
                                    Recipe
                                </Heading>
                                <Textarea
                                    minH={300}
                                    resize={"none"}
                                    value={
                                        recipe ? JSON.stringify(recipe, undefined, 2) : "No recipe"
                                    }
                                    readOnly={true}
                                />
                            </GridItem>
                            <GridItem w="full">
                                <Heading fontSize="lg" mb={2}>
                                    Golden Caption
                                </Heading>
                                {goldenCaption ? goldenCaption : "No golden caption"}
                            </GridItem>
                            <GridItem w="full">
                                <Heading fontSize="lg" mb={2}>
                                    Golden Recipe
                                </Heading>
                                <Textarea
                                    minH={300}
                                    resize={"none"}
                                    value={
                                        goldenRecipe
                                            ? JSON.stringify(goldenRecipe, undefined, 2)
                                            : "No recipe"
                                    }
                                    readOnly={true}
                                />
                            </GridItem>
                        </>
                    ) : null}
                </Grid>
            </VStack>
        </Box>
    )
}

export default CaptionEditor
