import type { ScaleBand, ScaleLinear } from "d3-scale"

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
export type ActionType = "overview" | "describe" | "compare" | "trend" | "none"
export type FeatureType = "max" | "min" | "recent" | "past"
export type ChartType = "bar" | "grouped_bar" | "stacked_bar" | "line" | "multi_line" | "pie"
export type MarkType = "bar" | "arc" | "line"

export interface Intent {
    action: ActionType
    targets?: Target[]
    diff?: string[]
}

export interface Recipe {
    chart_type: ChartType
    title: string
    unit: string
    intents: Intent[]
}

export class SelectedIntent implements Intent {
    id: number
    action: ActionType
    targets?: SelectedTarget[]
    diff?: string[]

    constructor(action: ActionType, targets?: SelectedTarget[], diff?: string[]) {
        this.id = Math.random()
        this.action = action
        if (targets) this.targets = targets
        if (diff) this.diff = diff
    }

    get() {
        if (this.action === "overview" && this.diff === undefined && this.targets === undefined) {
            return {
                action: this.action,
            }
        } else if (
            this.action === "describe" &&
            this.diff === undefined &&
            this.targets &&
            this.targets.length > 0
        ) {
            return {
                action: this.action,
                targets: this.targets.map((target) => target.get()),
            }
        } else if (
            this.action === "compare" &&
            this.diff &&
            this.diff.length === 1 &&
            this.targets &&
            this.targets.length === 2
        ) {
            return {
                action: this.action,
                targets: this.targets.map((target) => target.get()),
                diff: this.diff,
            }
        } else if (
            this.action === "trend" &&
            this.targets &&
            this.targets.length === 2 &&
            this.diff
        ) {
            return {
                action: this.action,
                targets: this.targets.map((target) => target.get()),
                diff: this.diff,
            }
        }
    }
}

export class SelectedTarget implements Target {
    id: string
    value: number
    key: string
    series?: string
    feature?: FeatureType[]
    constructor(value: number, key: string, series?: string, feature?: FeatureType[]) {
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
