import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { useRecoilState } from "recoil";
import { tableDataState } from "../../states";
import { ChartProps, TableData } from "../../types";
import { schemeCategory10 as color } from "d3-scale-chromatic";


const getValue = (d: TableData) => d.value;
const getCharacteristic = (d: TableData) => d.characteristic;
const pieSortValues = (a : number, b : number) => b - a;

export default function SimpleBarChart({ xMax, yMax, margins }: ChartProps) {
    const [tableData, setTableData] = useRecoilState(tableDataState);

    const xCenter = xMax / 2
    const yCenter = yMax / 2

    
    return (
        <Group top={yCenter} left={xCenter}>
            <Pie
                data={tableData}
                pieValue={getValue}
                pieSortValues={pieSortValues}
                outerRadius={Math.min(xMax, yMax) / 2}
            >
                {(pie) => {
                    return pie.arcs.map((arc, i) => {
                        const characteristic = getCharacteristic(
                            arc.data
                        );
                        const arcFill = color[i];
                        const arcPath = pie.path(arc) ?? "";
                        return (
                            <Group key={i}>
                                <path d={arcPath} fill={arcFill} />
                            </Group>
                        );
                    });
                }}
            </Pie>
            
        </Group>
    );
}
