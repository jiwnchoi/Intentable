import type { NextPage } from 'next'
import { Container, Center, Divider, Box } from '@chakra-ui/react';
import Navbar from '../src/Navbar';
import Footer from '../src/Footer'
import Dashboard from '../src/Dashboard'

const Home: NextPage = () => {
    return (
        <Box minHeight="100vh" bg="gray.50" pb={200}>
            <Navbar />
            <Divider />
            <Center>
                <Dashboard></Dashboard>
            </Center>
            <Divider />
            <Footer position="absolute" bottom={0}></Footer>
        </Box>
    );
}

export default Home
