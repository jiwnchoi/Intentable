import type { ScaleBand, ScaleLinear } from "d3-scale"
export type Mark = "bar" | "arc" | "line"

export type Size = {
    width: number
    height: number
}
export type ChartProps = {
    xScale: ScaleBand<string>
    yScale: ScaleLinear<number, number, never>
    xMax: number
    yMax: number
    margins: { top: number; right: number; bottom: number; left: number }
}

export type tableDataType = {
    [key: string]: number | string
}

export type fetchDemo = {
    title: string
    value_info: string
    chart_type: string
    row_type: string
    table: tableDataType[]
}

export type Selection = {
    key: string
    columnNumber: number
    rowNumber: number
    columnName: string
    feature?: string
    value: number
    characteristic: string
    type: "entity" | "name" | "both" | "none"
}

export type SingleColumnData = {
    characteristic: string
    value: number
}

export type MultiColumnData = {
    [key: string]: number | string
}

export type columnFeature = {
    max: Element
    min: Element
    recent?: Element
    past?: Element
}

export type featureTableType = {
    [colname: string]: columnFeature
}

export class Element {
    key: string
    feature: string | undefined
    value: number
    row: string
    column: string
    type: "overall" | "element"

    constructor(
        feature: string | undefined,
        value: number,
        row: string,
        column: string,
        type: "overall" | "element"
    ) {
        this.key = `${column}-${row}-${value}`
        this.feature = feature
        this.value = value
        this.row = row
        this.column = column
        this.type = type
    }


    setkey(key: string) {
        this.key = key
    }
}

export interface Target {
    feature: string
    row: string
    column: string | false
    value: number
}

export interface Intent {
    action: "summary" | "identify" | "compare" | "discover"
    type: "describe" | "question" | "one" | "two" | "greater" | "less" | "fluctuate"
    targets: Target[]
    period?: "for" | "since" | "before"
}

// export class Intent {
//     action: "summary" | "identify" | "compare" | "discover"
//     type: "describe" | "question" | "one" | "two" | "greater" | "less" | "fluctuate"
//     targets: Element[]
//     period?: "for" | "since" | "before"

//     constructor(
//         action: "summary" | "identify" | "compare" | "discover",
//         type: "describe" | "question" | "one" | "two" | "greater" | "less" | "fluctuate",
//         targets: Element[],
//         period?: "for" | "since" | "before",
//     ) {
//         this.action = action
//         this.type = type
//         this.period = period
//         this.targets = targets
//     }

//     get(){
//         const obj : intentObject= {
//             action: this.action,
//             type: this.type,
//             targets: this.targets,
//         }
//         if (this.period) {
//             obj.period = this.period
//         }
//         return obj
//     }
// }