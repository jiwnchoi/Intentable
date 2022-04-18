import {
    Box,
    Flex, Grid,
    GridItem, Heading,
    Spacer,
    Text,
    VStack
} from "@chakra-ui/react"
import { useMemo, useState } from "react"
import { useRecoilState } from "recoil"
import { chartTypeState, selectedIntentsState, targetTableState } from "../../states"
import { SelectedIntent, SelectedTarget } from "../../types"
import { ActionIcon } from "../util/ActionIcon"
import { getColorScheme } from "../util/colorSchemeUtils"
import { getFirstCaptital } from "../util/labelUtils"

const IntentObject = ({
    intent,
    targets,
}: {
    intent: SelectedIntent
    sub?: string
    targets?: SelectedTarget[]
}) => {
    const [intents, setIntents] = useRecoilState(selectedIntentsState)
    const [chartType, setChartType] = useRecoilState(chartTypeState)
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)
    const [colorKey, setColorKey] = useState("key")
    const renderTargets = targets
        ? targets
        : intent.targets
        ? intent.action === 'trend' ? [intent.targets[0], intent.targets[intent.targets.length -1]] :
            intent.targets
        : []

    const removeIntent = (intent: SelectedIntent) => {
        setIntents(intents.filter((i: SelectedIntent) => i.id !== intent.id))
    }

    const colorArray: string[] = useMemo(() => {
        if (chartType === "pie") {
            setColorKey("key")
            return targetTable["value"].map((d) => d.key)
        } else {
            setColorKey("series")
            return Object.keys(targetTable)
        }
    }, [targetTable])

    const colorScheme = useMemo(() => getColorScheme(colorArray), [colorArray])

    return (
        <Box
            minH={81}
            p={3}
            w={"full"}
            bg={"gray.100"}
            borderRadius={8}
            onClick={() => removeIntent(intent)}
        >
            <Flex
                minH={55}
                h={"full"}
                gap={1}
                overflowX="scroll"
                justifyContent={"center"}
                alignItems="center"
            >
                <ActionIcon action={intent.action} />
                <Text fontSize={"md"} fontWeight={"550"} verticalAlign="center">
                    {getFirstCaptital(intent.action)}
                </Text>
                <Spacer />
                <Grid h="full" w={345} gap={1} templateColumns="repeat(2, 1fr)">
                    {renderTargets.map((target: SelectedTarget, i: number) => (
                        <GridItem
                            w={"full"}
                            p={2}
                            h={"fit-content"}
                            bg={colorScheme(
                                colorKey === "series" ? target.series ?? "" : target.key
                            )}
                            borderRadius={8}
                            key={target.id}
                            color="white"
                            colSpan={i % 2 == 0 && i + 1 == renderTargets.length ? 2 : 1}
                        >
                            <VStack w="100%">
                                <Text
                                    fontSize="xs"
                                    lineHeight={1}
                                    w={150}
                                    overflow={"hidden"}
                                    whiteSpace={"nowrap"}
                                    textOverflow={"ellipsis"}
                                    align="center"
                                >
                                    {getFirstCaptital(target.key)}
                                </Text>
                                <Heading fontSize="md" lineHeight={1}>
                                    {target.value}
                                </Heading>
                            </VStack>
                        </GridItem>
                    ))}
                </Grid>
            </Flex>
        </Box>
    )
}

export default IntentObject
