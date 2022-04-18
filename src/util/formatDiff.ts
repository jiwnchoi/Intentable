export function formatDiff(diff : number) : string{
    // if diff is 0, return "0"
    // else if diff is positive, return "+" + diff, if diff is negative, return "-" + diff
    // if diff is float, diff should be .2f
    // if diff is integer, diff should be d

    if (Number.isInteger(diff)) {
        if (diff === 0) {
            return "0";
        }
        else if (diff > 0) {
            return "+" + diff.toString();
        }
        else {
            return diff.toString();
        }
    }
    else {
        if (diff === 0) {
            return "0";
        }
        else if (diff > 0) {
            return "+" + diff.toFixed(2).toString();
        }
        else {
            return diff.toFixed(2).toString();
        }
    }
    

}