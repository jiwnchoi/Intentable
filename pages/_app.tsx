import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { RecoilRoot } from 'recoil'

import '@fontsource/rajdhani';
import "../styles/globals.css";
import styles from "../styles/styles"

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RecoilRoot>
            <ChakraProvider theme={styles}>
                <Component {...pageProps} />
            </ChakraProvider>
        </RecoilRoot>
    );
}

export default MyApp;