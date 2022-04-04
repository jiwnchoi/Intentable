import { Element, featureTableType } from "../../types"
const checkUserSelection = (
    userSelection: Element[],
    key: string,
    characteristic: string,
    value: number
) => {
    return userSelection.some((d) => d.key === `${key}-${characteristic}-${value}`)
}

const modifyUserSelection = (
    userSelection: Element[],
    featureTable: featureTableType,
    key: string,
    characteristic: string,
    value: number
) => {
    const columnFeature = featureTable[key]
    if (userSelection.some((d) => d.key === `${key}-${characteristic}-${value}`)) {
        userSelection = userSelection.filter((d) => d.key !== `${key}-${characteristic}-${value}`)
    } else {
        const featureElement = Object.values(columnFeature).find(
            (d) => d.column === key && d.row === characteristic && d.value === value
        )
        if (featureElement) {
            userSelection =  [...userSelection, featureElement]
        } else {
            const selectedElement = new Element(
                undefined,
                value,
                characteristic,
                key,
                "element"
            )
            userSelection = [...userSelection, selectedElement]
        }
    }
    return userSelection
}

export { checkUserSelection, modifyUserSelection }
