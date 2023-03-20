import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Hero from "features/landing/components/HeroSection";
import SecondSection from "features/landing/components/SecondSection";
import ThirdSection from "features/landing/components/ThirdSection";
import HomePageFooter from "features/landing/components/HomePageFooter";
const NavBar = dynamic(() => import("components/layouts/NavBar"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <SecondSection />
      <ThirdSection />
      <HomePageFooter />
    </>
  );
};

export default Home;
