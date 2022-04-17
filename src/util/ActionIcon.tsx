import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import CompareArrowsOutlinedIcon from "@mui/icons-material/CompareArrowsOutlined"
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined"

const ActionIcon = ({ action }: { action: string }) => {
    switch (action) {
        case "overview":
            return <SummarizeOutlinedIcon />
        case "compare":
            return <CompareArrowsOutlinedIcon />
        case "trend":
            return <QueryStatsOutlinedIcon />
        case "describe":
            return <SearchOutlinedIcon />
    }
    return null
}

export { ActionIcon }
