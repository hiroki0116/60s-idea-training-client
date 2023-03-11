import CustomNavBar from "components/layout/CustomNavBar";
import HeroSection from "components/about/HeroSection";
import PortfolioSection from "components/about/PortfolioSection";
import HomePageFooter from "components/homepage/HomePageFooter";

const about = () => {
  return (
    <>
      <CustomNavBar />
      <HeroSection />
      <PortfolioSection />
      <HomePageFooter />
    </>
  );
};

export default about;
