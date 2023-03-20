import dynamic from "next/dynamic";
const NavBar = dynamic(() => import("components/layouts/NavBar"), {
  ssr: false,
});
import HeroSection from "features/portfolio/components/HeroSection";
import PortfolioSection from "features/portfolio/components/PortfolioSection";
import HomePageFooter from "features/landing/components/HomePageFooter";

const Portfolio = () => {
  return (
    <>
      <NavBar />
      <HeroSection />
      <PortfolioSection />
      <HomePageFooter />
    </>
  );
};

export default Portfolio;
