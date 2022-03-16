import { atom } from "recoil";
import axios from 'axios';


export type mark = "bar" | "arc" | "line";
export type table = {
    characteristic : string,
    value : number, 
    group? : string,
}

export const tableTitleState = atom({
    key : 'tableTitle',
    default : ""
})

export const tableValueInfoState = atom({
    key : 'tableValueInfo',
    default : ""
})

export const chartTypeState = atom<mark>({
    key : 'chartType',
    default : "bar"
})

export const tableDataState = atom<table[]>({
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