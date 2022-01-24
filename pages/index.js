import Head from 'next/head'
import Sidebar from '../components/Sidebar';
import Main from '../components/Main';

export default function Home() {
  return (
    <div className='bg-black h-screen overflow-hidden'>
      <Head>
        <title>spotify</title>
      </Head>

      <main className='flex'>
        <Sidebar />
        <Main />
      </main>

      <div>
        {/* player */}
      </div>
    </div>
  )
}
