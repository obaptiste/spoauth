import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/sidebar';
import Center from '../components/center';


const Home: NextPage = () => {
  return (
   <div className='bg-black h-screen overflow-hidden'>
    <main className='flex'>
    <Sidebar/>
    <Center/>
    </main>

    {/* player */}
    </div>
  )
}

export default Home
