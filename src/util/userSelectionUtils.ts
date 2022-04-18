import { SelectedTarget,  Target } from "../../types"
const checkUserSelection = (userSelection: SelectedTarget[], clicked: SelectedTarget) => {
    return userSelection.some((d) => d.id === clicked.id)
}

const modifyUserSelection = (
    userSelection: SelectedTarget[],
    clicked: SelectedTarget,
    chooseTarget: number
) => {
    if (!isMarkDeletable(chooseTarget, userSelection)) {
        return userSelection
    }else{
        if (isMarkAppendable(chooseTarget, userSelection)) {
            if (checkUserSelection(userSelection, clicked)) {
                return userSelection.filter((d) => d.id !== clicked.id)
            } else {
                return [...userSelection, clicked]
            }
        }
        else if (isMarkDeletable(chooseTarget, userSelection)) {
            return userSelection.filter((d) => d.id !== clicked.id)
        }
    }
    
    return userSelection
}

const isMarkAppendable = (chooseTarget: number, userSelection: SelectedTarget[]) => {
    if (chooseTarget === 0) {
        return false
    } else if (chooseTarget === 1) {
        return userSelection.length < 1
    } else if (chooseTarget === 2) {
        return userSelection.length < 2
    } else {
        return userSelection.length < 10
    }
}

const isMarkDeletable = (chooseTarget: number, userSelection: SelectedTarget[]) => {
    if (chooseTarget === 0) {
        return false
    } else if (chooseTarget === 1) {
        return userSelection.length <= 1
    } else if (chooseTarget === 2) {
        return userSelection.length <= 2
    } else {
        return true
    }
}

export { checkUserSelection, modifyUserSelection }
