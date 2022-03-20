import type { ScaleBand, ScaleLinear } from "d3-scale";
export type Mark = "bar" | "arc" | "line";
export type TableData = {
    characteristic: string;
    value : number;
    [key : string] : number | string;
};
export type Size = {
    width: number;
    height: number;
};
export type ChartProps = {
    xScale : ScaleBand<string>;
    yScale : ScaleLinear<number, number, never>;
    xMax : number;
    yMax : number;
    margins : { top : number, right : number, bottom : number, left : number };

}
export type UserSelection = {
    columnName? : string;
    rowName : string;
    value : number;
    columnIndex : number;
    rowIndex : number;
}