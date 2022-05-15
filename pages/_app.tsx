import Head from 'next/head';
import CustomNavBar from 'components/Layout/CustomNavBar';
import { AuthProvider } from 'context/authContext';

import type { AppProps } from 'next/app'

import 'tailwindcss/tailwind.css'
import 'styles/globals.css'
import '../styles/custom-antd.css';



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>      
      <Head>
        <title>
          60seconds Idea Training| Train your output skill for your thinkng ability and mental health
        </title>
        <meta
          name="description"
          content="60seconds Idea Training| Train your output skill for your thinkng ability and mental health."
        />
      </Head>
      <AuthProvider>
        <CustomNavBar />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
