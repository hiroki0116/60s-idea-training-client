import Head from 'next/head';
import { AuthProvider } from 'context/authContext';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'
import { capitalizeWords } from 'utils/formatter';


import 'tailwindcss/tailwind.css'
import 'styles/globals.css'
import '../styles/custom-antd.css';



function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();


  return (
    <>      
      <Head>
        <title>
        {capitalizeWords(router.asPath.split("/")).join(" ")} | 60seconds Idea Training
        </title>
        <meta
          name="description"
          content="60seconds Idea Training | Train your output skill for your thinkng ability and mental health."
        />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
