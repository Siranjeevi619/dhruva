import React, { useEffect } from "react";
import HeroSection from "./section/HeroSectionComponent";
import DhurvaFest from "./section/DhurvaFest";
import Banners from "@/components/page-components/Banners";
import ProPassList from "./section/ProPassList";
import Gallery from "./section/Gallery";
import VideoParallax from "./section/VideoParallax";
import Sponors from "@/components/page-components/Sponsors";
import PassPage from "@/components/page-components/PassCard";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <VideoParallax />
      <HeroSection />
      <Gallery />
      <DhurvaFest />
      <PassPage />
      <Banners />
      {/* <Sponors/> */}
    </div>
  );
}

export default HomePage;
