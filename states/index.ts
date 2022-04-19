import { atom } from "recoil"
import { ChartType, SelectedIntent, SelectedTarget, TargetTable } from "../types"

export const tableTitleState = atom({
    key: "tableTitle",
    default: "",
})

export const tableValueInfoState = atom({
    key: "tableValueInfo",
    default: "",
})

export const chartTypeState = atom<ChartType>({
    key: "chartType",
    default: "bar",
})

export const rowTypeState = atom({
    key: "rowType",
    default: "",
})

export const barGroupedState = atom({
    key: "barGrouped",
    default: false,
})

export const captionState = atom({
    key: "caption",
    default: "",
})

export const selectedIntentsState = atom<SelectedIntent[]>({
    key: "selectedIntents",
    default: [],
})

export const selectedTargetsState = atom<SelectedTarget[]>({
    key: "selectedTargets",
    default: [],
})

export const chooseTargetState = atom<number>({
    key: "chooseTarget",
    default: 0,
})

export const goldenCaptionState = atom({
    key: "goldenCaption",
    default: "",
})

export const goldenRecipeState = atom<any>({
    key: "goldenRecipe",
    default: {},
})

export const targetTableState = atom<TargetTable>({
    key: "targetTable",
    default: { value: [] },
})
