import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CoupleIntroduction from "@/components/sections/CoupleIntroduction";
import OurStory from "@/components/sections/OurStory";
import Gallery from "@/components/sections/Gallery";
import WishesPreview from "@/components/sections/WishesPreview";
import KwabenaOnceSaid from "@/components/sections/KwabenaOnceSaid";
import Memories from "@/components/sections/Memories";
import FinalCTA from "@/components/sections/FinalCTA";
import ScrollToTop from "@/components/ui/ScrollToTop";
import AudioPlayer from "@/components/ui/AudioPlayer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <CoupleIntroduction />
        <OurStory />
        <Gallery />
        <WishesPreview />
        <KwabenaOnceSaid />
        <Memories />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
      <AudioPlayer />
    </>
  );
}
