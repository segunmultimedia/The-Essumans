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
import { prisma } from "@/lib/prisma";

export const revalidate = 60; // Safe caching boundary (1 min), plus on-demand revalidation

export default async function Home() {
  // Fetch only APPROVED content from the database
  const approvedWishes = await prisma.wish.findMany({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" }
  });

  const approvedMemories = await prisma.memory.findMany({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" }
  });

  const approvedQuotes = await prisma.kwabenaQuote.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "asc" }
  });

  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <CoupleIntroduction />
        <OurStory />
        <Gallery />
        <WishesPreview wishes={approvedWishes} />
        <KwabenaOnceSaid quotes={approvedQuotes} />
        <Memories memories={approvedMemories} />
        <FinalCTA />
      </main>
      <Footer />
      <ScrollToTop />
      <AudioPlayer />
    </>
  );
}
