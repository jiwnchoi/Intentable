import { FetchTableType } from "../../types";

export function csv2table(csv: string): FetchTableType[] | undefined {
    const lines = csv.split("\n");
    const result = [];
    const headers = lines[0].split(",");
    const serieses = headers[0]==="key" ? headers.slice(1) : []
    if (serieses.length === 0) return undefined;

    const table = []

    for (let i = 1; i < lines.length; i++) {
        const currentline = lines[i].split(",");
        const key = currentline[0]
        const values = currentline.slice(1)
        const row : FetchTableType = {key}
        for (const i in values){
            row[serieses[i]] = Number(values[i])
        }
        table.push(row)
    }
    return table
}