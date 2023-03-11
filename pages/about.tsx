import CustomNavBar from "components/layout/CustomNavBar";
import HeroSection from "features/portfolio/components/HeroSection";
import PortfolioSection from "features/portfolio/components/PortfolioSection";
import HomePageFooter from "features/landing/components/HomePageFooter";

const Portfolio = () => {
  return (
    <>
      <CustomNavBar />
      <HeroSection />
      <PortfolioSection />
      <HomePageFooter />
    </>
  );
};

export default Portfolio;
