import type { NextPage } from "next";
import Hero from "features/landing/components/HeroSection";
import CustomNavBar from "components/layouts/NavBar";
import SecondSection from "features/landing/components/SecondSection";
import ThirdSection from "features/landing/components/ThirdSection";
import HomePageFooter from "features/landing/components/HomePageFooter";

const Home: NextPage = () => {
  return (
    <>
      <CustomNavBar />
      <Hero />
      <SecondSection />
      <ThirdSection />
      <HomePageFooter />
    </>
  );
};

export default Home;
