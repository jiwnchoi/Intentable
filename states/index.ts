import { atom } from "recoil";
import { Mark, TableData } from "../types"



export const tableTitleState = atom({
    key : 'tableTitle',
    default : ""
})

export const tableValueInfoState = atom({
    key : 'tableValueInfo',
    default : ""
})

export const chartTypeState = atom<Mark>({
    key : 'chartType',
    default : "bar"
})

export const tableDataState = atom<TableData[]>({
    key: "tableData",
    default: [],
});

export const rowTypeState = atom({
    key : 'rowType',
    default : ""
})

export const selectedElementState = atom({
    key : 'selectedElement',
    default : []
})

export const barGroupedState = atom({
    key : 'barGrouped',
    default : true,
})

export const userSelectionState = atom<any[]>({
    key : 'userSelection',
    default : [],
})