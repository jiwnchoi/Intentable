import {
    GridItem,
    Text,
    Box,
    SimpleGrid,
    Container,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    Heading,
    HStack,
    Input,
    Radio,
    Flex,
    VStack,
    Textarea,
    Button,
} from "@chakra-ui/react"
import ChartRenderer from "./chartViewer"
import TableConfigureation from "./tableConfig"
import CaptionViewer from "./captionViewer"
import IntentList from "./inetntList"
import IntentEditor from "./intentEditor"
import axios from "axios"
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
    targetTableLoadedState,
} from "../states"
import { useEffect, useState } from "react"
import { ChartType, Intent, Recipe } from "../types"
import { apiLink } from "./util/config"
import dynamic from "next/dynamic"

const RecipeConfig = dynamic(import("./tableConfig"), { ssr: false })

const Dashboard = () => {
    const [chartType, setChartType] = useRecoilState(chartTypeState)
    const [tableTitle, setTableTitle] = useRecoilState(tableTitleState)
    const [valueInfo, setValueInfo] = useRecoilState(tableValueInfoState)
    const [selectedIntents, setSelectedIntents] = useRecoilState(selectedIntentsState)
    const [caption, setCaption] = useRecoilState(captionState)
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [targetTableLoaded, setTargetTableLoaded] = useRecoilState(targetTableLoadedState)

    const [recipe, setRecipe] = useState({})
    const [sourceSequence, setSourceSequence] = useState("")
    const [showDetail, setShowDetail] = useState(false)

    const predict = async () => {
        console.log(JSON.stringify(recipe))
        const get = await axios.post(`${apiLink}/predict`, {
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
        <Container maxW={"8xl"} m={2}>
            <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(5, 1fr)" }} gap={2}>
                <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <Box bg="white" boxShadow="base" borderRadius={8} mb={2} p={4}>
                        <RecipeConfig />
                    </Box>
                    <Box bg="white" boxShadow="base" borderRadius={8} mb={2} p={4}>
                        <IntentEditor />
                        <IntentList />
                        <Button
                            w="full"
                            mt="4"
                            bg="gray.500"
                            color="white"
                            onClick={predict}
                            disabled={selectedIntents.length === 0 ? true : false}
                        >
                            Generate Caption
                        </Button>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 1, lg: 3 }}>
                    <Box bg="white" boxShadow="base" borderRadius={8} mb={2}>
                        <ChartRenderer minH={200} />
                    </Box>
                    <Box bg="white" boxShadow="base" borderRadius={8}>
                        <CaptionViewer />
                    </Box>
                </GridItem>
            </Grid>
        </Container>
    )
}

export default Dashboard
