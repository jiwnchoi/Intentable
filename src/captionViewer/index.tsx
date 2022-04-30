import {
    Box,
    Button,
    Center,
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
        const get = await axios.post(`/predict`, {
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
        <Box p={4}>
            <VStack spacing={4} align="left">
                <Grid w="full" h="full" gap={8} templateColumns={"repeat(2, 1fr)"}>
                    <GridItem w="full" colSpan={1}>
                        <Heading fontSize="lg" mb={4}>
                            Predicted Caption
                        </Heading>
                        {caption ? (
                            caption
                        ) : (
                            <Center minH={200} textAlign="center">
                                Create intents and press Generate Caption button!
                            </Center>
                        )}
                    </GridItem>
                    <GridItem w="full">
                        <Heading fontSize="lg" mb={2}>
                            Recipe
                        </Heading>
                        <Textarea
                            minH={273}
                            resize={"none"}
                            value={recipe ? JSON.stringify(recipe, undefined, 2) : "No recipe"}
                            readOnly={true}
                            border="0"
                        />
                    </GridItem>
                    {/* <GridItem w="full">
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
                            minH={200}
                            resize={"none"}
                            value={
                                goldenRecipe
                                    ? JSON.stringify(goldenRecipe, undefined, 2)
                                    : "No recipe"
                            }
                            readOnly={true}
                        />
                    </GridItem> */}
                </Grid>
            </VStack>
        </Box>
    )
}

export default CaptionEditor
