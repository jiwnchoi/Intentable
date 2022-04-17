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

export type FetchTableType = {
    [series: string]: number | string
}

export type FetchDemo = {
    recipe: Recipe
    row_type: string
    table: FetchTableType[]
    caption: string
}

export interface Target {
    value: number
    key: string
    series?: string
    feature?: string[]
}

export interface TargetTable {
    [series: string]: SelectedTarget[]
}

export interface Features {
    max: number
    min: number
    recent: string
    past: string
}
export type actionType = "overview" | "describe" | "compare" | "trend" | "none"
export type relationType = "equal" | "less" | "greater"
export type chartType = "bar" | "grouped_bar" | "stacked_bar" | "line" | "multi_line" | "pie"

export type MarkType = "bar" | "arc" | "line"

export interface Intent {
    action: actionType
    relation?: relationType
    relations?: relationType[]
    targets?: Target[]
}

export interface Recipe {
    chart_type: chartType
    title: string
    unit: string
    intents: Intent[]
}

export class SelectedIntent implements Intent {
    id: number
    action: actionType
    relation?: relationType
    relations?: relationType[]
    targets?: SelectedTarget[]

    constructor(
        action: actionType,
        relation?: relationType,
        relations?: relationType[],
        targets?: SelectedTarget[]
    ) {
        this.id = Math.random()
        this.action = action
        if (targets) this.targets = targets
        if (relation) this.relation = relation
        if (relations) this.relations = relations
    }

    get() {
        if (
            this.action === "overview" &&
            this.relation === undefined &&
            this.relations === undefined &&
            this.targets === undefined
        ) {
            return {
                action: this.action,
            }
        } else if (
            this.action === "describe" &&
            this.relation === undefined &&
            this.relations === undefined &&
            this.targets &&
            this.targets.length > 0
        ) {
            return {
                action: this.action,
                targets: this.targets.map((target) => target.get()),
            }
        } else if (
            this.action === "compare" &&
            this.relation !== undefined &&
            this.relations === undefined &&
            this.targets &&
            this.targets.length === 2
        ) {
            return {
                action: this.action,
                relation: this.relation,
                targets: this.targets.map((target) => target.get()),
            }
        } else if (
            this.action === "trend" &&
            this.relations &&
            this.relations.length > 0 &&
            this.targets &&
            this.targets.length > 2
        ) {
            return {
                action: this.action,
                relations: this.relations,
                targets: this.targets.map((target) => target.get()),
            }
        }
    }
}

export class SelectedTarget implements Target {
    id: string
    value: number
    key: string
    series?: string
    feature?: string[]
    constructor(value: number, key: string, series?: string, feature?: string[]) {
        this.id = `${series}-${key}-${value}`
        this.value = value
        this.key = key
        this.series = series
        this.feature = feature
    }

    get() {
        const target: Target = {
            value: this.value,
            key: this.key,
        }
        if (this.series !== "value") {
            target.series = this.series
        }
        if (this.feature && this.feature.length > 0) {
            target.feature = this.feature
        }
        return target
    }
}
