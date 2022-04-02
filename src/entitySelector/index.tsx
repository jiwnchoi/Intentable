import { Box, Heading, VStack, Divider, Button, Flex, Spacer } from "@chakra-ui/react";
import { userSelectionState } from "../../states";
import { useRecoilState } from "recoil";
import SelectionList from "./list";
import { Element } from "../../types";
import { AddIcon } from "@chakra-ui/icons";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";


export default function EntitySelector({ minH }: any) {
    const [userSelection, setUserSelection] =
        useRecoilState(userSelectionState);
    const includeOverall = () => {
        if (userSelection.length > 0 && userSelection[0].key === "overall") {
            setUserSelection(userSelection.filter((d) => d.key !== "overall"));
        } else {
            const overallSelection = new Element(
                "overall",
                "overall",
                0,
                "",
                "",
                "overall"
            );
            setUserSelection([overallSelection, ...userSelection]);
        }
    }

    const handleChange = (result : DropResult) => {
        if (!result.destination) return;
        const reordered = Array.from(userSelection);
        const [removed] = reordered.splice(result.source.index, 1);
        reordered.splice(result.destination.index, 0, removed);
        setUserSelection(reordered);
    }
    return (
        <Box p={6} minH={minH}>
            <Flex justifyContent={"space-between"} mb={4}>
                <Heading fontSize="xl">Selected Entity</Heading>
                <Spacer />

                <Button
                    leftIcon={<AddIcon w={2} h={2} />}
                    size="sm"
                    colorScheme="blue"
                    variant="solid"
                    onClick={includeOverall}
                >
                    Overview
                </Button>
            </Flex>

            <Divider />
            <DragDropContext onDragEnd={handleChange}>
                <Droppable droppableId="droppable" direction="vertical">
                    {(provided, snapshot) => (
                        <Box
                            className="top-container"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <Box className="list-container">
                                {userSelection.map((selection, index) => (
                                    <Draggable
                                        key={selection.key}
                                        draggableId={selection.key}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <Box
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <SelectionList selection={selection} />
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                            </Box>

                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
}
