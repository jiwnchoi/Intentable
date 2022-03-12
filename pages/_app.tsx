import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"

import '@fontsource/rajdhani';

import "../styles/globals.css";
import styles from "../styles/styles"
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={styles}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;