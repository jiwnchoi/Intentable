import BarChart from "./BarChart";
import ParentSize from "@visx/responsive/lib/components/ParentSize";

const RenderChart = ({ chartType , table, axisTitle }: any) => {

    return (
        <ParentSize>{({width, height}) => <BarChart width={width} height={height}/>}</ParentSize>
        
    );
}

export default RenderChart
