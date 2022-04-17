import { Center, Flex, Grid, GridItem } from "@chakra-ui/react"
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
                    {/* <Flex
                        flexDirection="row"
                        fontSize={legendGlyphSize}
                        w={"full"}
                        justifyContent="space-evenly"
                        overflowX={"scroll"}
                    >
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
                                <LegendLabel align="left" margin={"0px 20px 0px 10px"}>
                                    {entry.text}
                                </LegendLabel>
                            </LegendItem>
                        ))}
                    </Flex> */}
                    <Grid w="full" templateColumns={`repeat(${legend.length > 2 ? 6 : legend.length * 2}, 1fr)`}>
                        {legend.map((entry, i) => (
                            <GridItem colSpan={2} >
                                    <LegendItem key={i}>
                                        <svg width={legendGlyphSize} height={legendGlyphSize}>
                                            <circle
                                                cx={legendGlyphSize / 2}
                                                cy={legendGlyphSize / 2}
                                                r={legendGlyphSize / 2}
                                                fill={entry.value}
                                            />
                                        </svg>
                                        <LegendLabel align="left" margin={"0px 20px 0px 10px"}>
                                            {entry.text}
                                        </LegendLabel>
                                    </LegendItem>
                            </GridItem>
                        ))}
                    </Grid>
                </Center>
            )}
        </LegendOrdinal>
    )
}
