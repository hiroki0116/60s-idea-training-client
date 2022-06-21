import type { NextPage } from 'next'
import Hero from 'components/homepage/Hero/HeroSection';
import CustomNavBar from 'components/Layout/CustomNavBar';

const Home: NextPage = () => {
  return (
    <>
      <CustomNavBar />
      <Hero />
    </>

    )
}

export default Home
