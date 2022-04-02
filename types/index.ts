import type { ScaleBand, ScaleLinear } from "d3-scale";
export type Mark = "bar" | "arc" | "line";

export type Size = {
    width: number;
    height: number;
};
export type ChartProps = {
    xScale: ScaleBand<string>;
    yScale: ScaleLinear<number, number, never>;
    xMax: number;
    yMax: number;
    margins: { top: number; right: number; bottom: number; left: number };
};

export type tableDataType = {
    [key : string] : number | string,
}

export type fetchDemo = {
    title: string;
    value_info: string;
    chart_type: string;
    row_type: string;
    table: tableDataType[];
};

export type Selection = {
    key: string;
    columnNumber: number;
    rowNumber: number;
    columnName: string;
    feature?: string;
    value: number;
    characteristic: string;
    type: "entity" | "name" | "both" | "none";
};

export type SingleColumnData = {
    characteristic : string,
    value : number, 
};

export type MultiColumnData = {
    [key: string]: number | string;
};

export type columnFeature = {
    [index: string]: string | undefined;
    max: string;
    min: string;
    recent?: string;
    past?: string;
};

export class Element {
    constructor(
        public key: string,
        public feature : string | undefined,
        public value: number,
        public row : string,
        public column : string,
        public type : "overall" | "element"
    ){}
    
    get(){
        if (this.type === "overall"){
            return `<selection_item>overall</selection_item>`;
        }
        return `<selection_item>feature=${this.feature ? this.feature : "none"}, row=${this.row}, column=${this.column}, value=${this.value}</selection_item>`;
    }
}