
import { hsl } from "d3-color"
import { schemeCategory10 } from "d3-scale-chromatic"
import { scaleOrdinal } from "@visx/scale"

const getSelectedColor = (color: string) =>
    String(hsl(hsl(color).h, hsl(color).s, hsl(color).l * 1.5))


const getColorScheme = (keys : string[]) => scaleOrdinal({
        domain: keys,
        range: [...schemeCategory10],
    })


const getSelectedColorScheme = (keys : string[]) => scaleOrdinal({
        domain: keys,
        range: [...schemeCategory10].map(getSelectedColor),
    })

const singleColor = schemeCategory10[0]
const selectedSingleColor = getSelectedColor(singleColor)

export { getColorScheme, getSelectedColorScheme, singleColor, selectedSingleColor }