import Head from 'next/head';
import { AuthProvider } from 'context/authContext';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app'
import { capitalizeWords } from 'utils/formatter';


import 'tailwindcss/tailwind.css'
import 'styles/globals.css'
import '../styles/custom-antd.css';
import { createApolloClient } from 'utils/apolloClient';



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
        <ApolloProvider client={createApolloClient()} >
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
