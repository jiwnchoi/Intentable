import { Center, Flex } from "@chakra-ui/react"
import { LegendItem, LegendLabel, LegendOrdinal } from "@visx/legend"
import { scaleOrdinal } from "@visx/scale"
import { schemeCategory10 as color } from "d3-scale-chromatic"

export default function Legends({
    legendGlyphSize,
    keys,
}: {
    legendGlyphSize: number
    keys: string[]
}) {
    const ordinalColorScale = scaleOrdinal({
        domain: keys,
        range: [...color],
    })

    return (
        <LegendOrdinal scale={ordinalColorScale}>
            {(legend) => (
                <Center>
                    <Flex flexDirection="row" fontSize={legendGlyphSize}>
                        {legend.map((entry, i) => (
                            <LegendItem key={i}>
                                <svg width={legendGlyphSize} height={legendGlyphSize}>
                                    <circle
                                        cx={legendGlyphSize / 2}
                                        cy={legendGlyphSize / 2}
                                        r={legendGlyphSize / 2}
                                        fill={entry.value}
                                    />
                                </svg>
                                <LegendLabel align="left" margin={"0px 10px 0px 3px"}>
                                    {entry.text}
                                </LegendLabel>
                            </LegendItem>
                        ))}
                    </Flex>
                </Center>
            )}
        </LegendOrdinal>
    )
}
