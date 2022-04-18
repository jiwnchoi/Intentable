import { Alert, AlertIcon, Box, Button, Divider, Flex, Heading, VStack } from "@chakra-ui/react"
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined"
import { useState } from "react"
import { useRecoilState } from "recoil"
import {
    chooseTargetState,
    rowTypeState,
    selectedIntentsState,
    selectedTargetsState,
    targetTableState,
} from "../../states"
import { ActionType, SelectedIntent } from "../../types"
import IntentObject from "../inetntList/intentObject"
import { formatDiff } from "../util/formatDiff"

const intentEditor = () => {
    const [actionClicked, setActionClicked] = useState("none")
    const [intents, setIntents] = useRecoilState(selectedIntentsState)
    const [chooseTarget, setChooseTarget] = useRecoilState(chooseTargetState)
    const [selectedTargets, setSelectedTargets] = useRecoilState(selectedTargetsState)
    const [rowType, setRowType] = useRecoilState(rowTypeState)
    const [targetTable, setTargetTable] = useRecoilState(targetTableState)

    const resetClicked = () => {
        setActionClicked("none")
        setChooseTarget(0)
        setSelectedTargets([])
    }

    const appendHandler = () => {
        if (actionClicked === "overview") {
            setIntents([...intents, new SelectedIntent("overview")])
        } else if (actionClicked === "describe") {
            setIntents([
                ...intents,
                new SelectedIntent("describe", [...selectedTargets], undefined),
            ])
        } else if (actionClicked === "compare") {
            const diff = selectedTargets[1].value - selectedTargets[0].value
            const formattedDiff = formatDiff(diff)
            setIntents([
                ...intents,
                new SelectedIntent("compare", [...selectedTargets], [formattedDiff]),
            ])
        } else if (actionClicked === "trend") {
            const series =
                Object.keys(targetTable).length === 1
                    ? "value"
                    : (selectedTargets[0].series as string)
            const seriesTargets = targetTable[series]
            const indexKey1 = seriesTargets.findIndex((d) => d.id === selectedTargets[0].id)
            const indexKey2 = seriesTargets.findIndex((d) => d.id === selectedTargets[1].id)
            const start = Math.min(indexKey1, indexKey2)
            const end = Math.max(indexKey1, indexKey2)
            const trendTargets = seriesTargets.slice(start, end + 1)
            const trendDiffs: string[] = []
            for (let i = 0; i < trendTargets.length - 1; i++) {
                const diff = trendTargets[i + 1].value - trendTargets[i].value
                trendDiffs.push(formatDiff(diff))
            }
            setIntents([
                ...intents,
                new SelectedIntent(
                    "trend",
                    [trendTargets[0], trendTargets[trendTargets.length - 1]],
                    trendDiffs
                ),
            ])
        }
        resetClicked()
    }

    const overviewHandler = () => {
        if (actionClicked === "none") {
            setActionClicked("overview")
        } else resetClicked()
    }

    const describeHandler = () => {
        if (actionClicked === "none") {
            setActionClicked("describe")
            setChooseTarget(5)
        } else resetClicked()
    }
    const compareHandler = () => {
        if (actionClicked === "none") {
            setActionClicked("compare")
            setChooseTarget(2)
        } else resetClicked()
    }
    const trendHandler = () => {
        if (actionClicked === "none") {
            setActionClicked("trend")
            setChooseTarget(2)
        } else resetClicked()
    }

    const isIntentAppendable = (): boolean => {
        if (actionClicked === "none") return true
        else if (actionClicked === "overview") return false
        else if (actionClicked === "describe") return !(selectedTargets.length > 0)
        else if (actionClicked === "compare") return !(selectedTargets.length === 2)
        else if (actionClicked === "trend")
            return !(
                selectedTargets.length === 2 &&
                selectedTargets[0].series === selectedTargets[1].series
            )
        else return true
    }
    return (
        <Box p={6}>
            <VStack spacing={4} align="left">
                <Heading fontSize="xl">Intent Editor</Heading>
                <Divider />

                <Flex gap={2}>
                    <Button
                        leftIcon={<SummarizeOutlinedIcon />}
                        w="full"
                        size={"sm"}
                        disabled={
                            actionClicked === "none" || actionClicked === "overview" ? false : true
                        }
                        onClick={overviewHandler}
                    >
                        Overview
                    </Button>
                    <Button
                        leftIcon={<SearchOutlinedIcon />}
                        w="full"
                        size={"sm"}
                        disabled={
                            actionClicked === "none" || actionClicked === "describe" ? false : true
                        }
                        onClick={describeHandler}
                    >
                        Describe
                    </Button>
                    <Button
                        leftIcon={<CompareArrowsOutlinedIcon />}
                        w="full"
                        size={"sm"}
                        disabled={
                            actionClicked === "none" || actionClicked === "compare" ? false : true
                        }
                        onClick={compareHandler}
                    >
                        Compare
                    </Button>
                    <Button
                        leftIcon={<QueryStatsOutlinedIcon />}
                        w="full"
                        size={"sm"}
                        disabled={
                            (actionClicked === "none" || actionClicked === "trend") &&
                            rowType === "DATE"
                                ? false
                                : true
                        }
                        onClick={trendHandler}
                    >
                        Trends
                    </Button>
                </Flex>
                <Divider />
                {actionClicked !== "none" ? (
                    <IntentObject
                        intent={new SelectedIntent(actionClicked as ActionType)}
                        targets={selectedTargets}
                    />
                ) : null}
                {actionClicked === "compare" ? (
                    <Alert status={"warning"}>
                        <AlertIcon /> Click two target visual marks to append.
                    </Alert>
                ) : actionClicked === "describe" ? (
                    <Alert status={"info"}>
                        <AlertIcon /> Click visual marks to append.
                    </Alert>
                ) : actionClicked === "trend" ? (
                    <Alert status={"warning"}>
                        <AlertIcon /> Click two target visual marks to set start and end years.
                    </Alert>
                ) : null}
                {actionClicked !== "none" ? (
                    <Button
                        w="full"
                        size={"md"}
                        onClick={appendHandler}
                        bg="gray.500"
                        color="white"
                        disabled={isIntentAppendable()}
                    >
                        Append Intent
                    </Button>
                ) : null}
            </VStack>
        </Box>
    )
}

export default intentEditor
