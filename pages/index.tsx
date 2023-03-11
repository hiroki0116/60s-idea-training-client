import type { NextPage } from "next";
import Hero from "components/homepage/HeroSection";
import CustomNavBar from "components/layout/CustomNavBar";
import SecondSection from "components/homepage/SecondSection";
import ThirdSection from "components/homepage/ThirdSection";
import HomePageFooter from "components/homepage/HomePageFooter";

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
