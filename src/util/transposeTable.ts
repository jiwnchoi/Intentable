import { SelectedTarget, TargetTable } from "../../types";

const transposeTable = (table : TargetTable) => {
    const transposeTable = []
    const series = Object.keys(table)
    const keys = table[series[0]].map(target => target.key)
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        const row : any = {}
        const rowTargets : SelectedTarget[] = []
        for (let j = 0; j < series.length; j++) {
            const seriesName = series[j]
            const target = table[seriesName][i]
            row[seriesName] = target.value
            rowTargets.push(target)    
        }
        row["characteristic"] = key
        row["targets"] = rowTargets
        
        transposeTable.push(row)
    }
    return transposeTable
}

export {transposeTable}