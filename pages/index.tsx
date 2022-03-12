import type { NextPage } from 'next'
import { Container, Center, Divider } from '@chakra-ui/react';
import Navbar from '../src/Navbar';
import Footer from '../src/Footer'
import Dashboard from '../src/Dashboard'

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Divider />
      <Center bg="gray.50">
        <Dashboard></Dashboard>
      </Center>
      <Divider /> 
      <Footer></Footer>
    </>
  )
}

export default Home
