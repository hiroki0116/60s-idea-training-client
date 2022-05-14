import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import 'styles/globals.css'
import CustomNavBar from 'components/Layout/CustomNavBar';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CustomNavBar />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
