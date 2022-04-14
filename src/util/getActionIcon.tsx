import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined"
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined"

const ActionIcon = ({actionName} : {actionName : string} ) => {
    switch (actionName) {
        case 'summary':
            return <SummarizeOutlinedIcon />
        case 'compare':
            return <CompareArrowsOutlinedIcon />
        case 'trend':
            return <QueryStatsOutlinedIcon />
        case 'identify':
            return <SearchOutlinedIcon />
        case 'describe':
            return <DescriptionOutlinedIcon />
        case 'question':
            return <LiveHelpOutlinedIcon />
    }
}
    
export default ActionIcon