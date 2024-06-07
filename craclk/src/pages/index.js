import Link from 'next/link'
import Head from "next/head";
import Stack from '@mui/material/Stack';
import {Nav} from '/src/components/nav.js'

export default function Home() {
  return (
    <div>
        <Head>
          <title>Craclk Landing Page</title>
        </Head>
        <header>
          <Nav />
        </header>
        <div className='archivo w-10/12 flex p-20 relative'>
            <div className='w-2/4'>
              <h1 className="text-8xl black font-bold">Your place to talk</h1>
              <p className='text-2xl'>Whether you're part of a school club, a gaming group, a worldwide art community, or just a handful of friends that want to spend time together, Craclk makes it easy to talk every day and hang out more often.</p>
            
              <Stack spacing={2} direction="row" className="mt-2">
                  <Link href="/download">
                    <button className="button-filled" style={{backgroundColor:"#17b3a1"}}>Download for Windows</button>
                  </Link>
                  <Link href="/login">
                    <button className="button-outlined">Open Craclk in your browser</button>
                  </Link>
              </Stack>
            </div>
            <img src="img/craclk_blob.png" className='-right-2 absolute w-1/3'></img>
        </div>
        <hr />
        <div className='archivo w-2/4 flex relative'>
        </div>
    </div>
  );
}