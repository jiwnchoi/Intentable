import { Alert, AlertIcon, Box, Button, Divider, Flex, Heading, VStack } from "@chakra-ui/react"
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"

import { useState } from "react"

const intentEditor = () => {
    const [actionClicked, setActionClicked] = useState("none")
    const [targetClicked, setTargetClicked] = useState("none")
    const [chooseElements, setChooseElements] = useState(0)

    const resetClicked = () => {
        setActionClicked("none")
        setTargetClicked("none")
        setChooseElements(0)
    }

    const summaryHandler = () => {
        if (actionClicked === "none") setActionClicked("summary")
        else resetClicked()
    }
    const identifyHandler = () => {
        if (actionClicked === "none") setActionClicked("identify")
        else resetClicked()
    }
    const compareHandler = () => {
        if (actionClicked === "none") {
            setActionClicked("compare")
            setChooseElements(2)
        } else resetClicked()
    }
    const trendHandler = () => {
        if (actionClicked === "none") setActionClicked("trend")
        else resetClicked()
    }

    const summaryTypeHandler = (summaryType: "describe" | "question") => {
        setTargetClicked(targetClicked === "none" ? summaryType : "none")
    }
    const identifyTypeHandler = (compareType: "one" | "two") => {
        setTargetClicked(targetClicked === "none" ? compareType : "none")
        if (compareType === "one") setChooseElements(1)
        else if (compareType === "two") setChooseElements(2)
    }
    const trendTypeHandler = (trendType: "for" | "since" | "before") => {
        setTargetClicked(targetClicked === "none" ? trendType : "none")
        setChooseElements(3)
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
                            actionClicked === "none" || actionClicked === "summary" ? false : true
                        }
                        onClick={summaryHandler}
                    >
                        Summary
                    </Button>
                    <Button
                        leftIcon={<SearchOutlinedIcon />}
                        w="full"
                        size={"sm"}
                        disabled={
                            actionClicked === "none" || actionClicked === "identify" ? false : true
                        }
                        onClick={identifyHandler}
                    >
                        Identify
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
                            actionClicked === "none" || actionClicked === "trend" ? false : true
                        }
                        onClick={trendHandler}
                    >
                        Trends
                    </Button>
                </Flex>
                {actionClicked == "summary" ? (
                    <Flex gap={2} mb={2}>
                        <Button
                            leftIcon={<DescriptionOutlinedIcon />}
                            w="full"
                            size={"sm"}
                            onClick={() => summaryTypeHandler("describe")}
                        >
                            Describe
                        </Button>
                        <Button
                            leftIcon={<LiveHelpOutlinedIcon />}
                            w="full"
                            size={"sm"}
                            onClick={() => summaryTypeHandler("question")}
                        >
                            Question
                        </Button>
                    </Flex>
                ) : null}
                {actionClicked == "compare" ? null : null}
                {actionClicked == "identify" ? (
                    <Box>
                        <Flex gap={2} mb={2}>
                            <Button
                                w="full"
                                size={"sm"}
                                onClick={() => identifyTypeHandler("one")}
                                disabled={
                                    targetClicked === "none" || targetClicked === "one"
                                        ? false
                                        : true
                                }
                            >
                                One Target
                            </Button>
                            <Button
                                w="full"
                                size={"sm"}
                                onClick={() => identifyTypeHandler("two")}
                                disabled={
                                    targetClicked === "none" || targetClicked === "two"
                                        ? false
                                        : true
                                }
                            >
                                Two Target
                            </Button>
                        </Flex>
                    </Box>
                ) : null}
                {actionClicked == "trend" ? (
                    <Flex gap={2} mb={2}>
                        <Button
                            w="full"
                            size={"sm"}
                            onClick={() => trendTypeHandler("since")}
                            disabled={
                                targetClicked === "none" || targetClicked === "since" ? false : true
                            }
                        >
                            Since
                        </Button>
                        <Button
                            w="full"
                            size={"sm"}
                            onClick={() => trendTypeHandler("for")}
                            disabled={
                                targetClicked === "none" || targetClicked === "for" ? false : true
                            }
                        >
                            During
                        </Button>
                        <Button
                            w="full"
                            size={"sm"}
                            onClick={() => trendTypeHandler("before")}
                            disabled={
                                targetClicked === "none" || targetClicked === "before"
                                    ? false
                                    : true
                            }
                        >
                            Until
                        </Button>
                    </Flex>
                ) : null}
                {chooseElements === 0 ? null : chooseElements === 1 ? (
                    <Alert status={"warning"}>
                        <AlertIcon /> Click a target visual mark to append.
                    </Alert>
                ) : chooseElements === 2 ? (
                    <Alert status={"warning"}>
                        <AlertIcon /> Click two target visual marks to append.
                    </Alert>
                ) : chooseElements === 3 ? (
                    <Alert status={"info"}>
                        <AlertIcon /> Click visual marks up to two. (0 ~ 2)
                    </Alert>
                ) : null}
            </VStack>
        </Box>
    )
}

export default intentEditor
