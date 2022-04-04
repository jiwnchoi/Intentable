import { atom } from "recoil"
import { Mark, Element, tableDataType, columnFeature } from "../types"

export const tableTitleState = atom({
    key: "tableTitle",
    default: "",
})

export const tableValueInfoState = atom({
    key: "tableValueInfo",
    default: "",
})

export const chartTypeState = atom<Mark>({
    key: "chartType",
    default: "bar",
})

export const tableDataState = atom<tableDataType[]>({
    key: "tableData",
    default: [],
})

export const rowTypeState = atom({
    key: "rowType",
    default: "",
})

export const selectedElementState = atom({
    key: "selectedElement",
    default: [],
})

export const barGroupedState = atom({
    key: "barGrouped",
    default: true,
})

export const userSelectionState = atom<Element[]>({
    key: "userSelection",
    default: [],
})

export const captionState = atom({
    key: "caption",
    default: "",
})

export const featureTableState = atom<{ [colname: string]: columnFeature }>({
    key: "featureTable",
    default: {},
})

export const hasOverviewState = atom({
    key: "hasOverview",
    default: true,
})