import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import AudioPlayer from "@/components/ui/AudioPlayer";
import FullGalleryClient from "./FullGalleryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Moments - The Essumans",
  description: "A collection of moments from Kwabena and Kristine's wedding day.",
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <FullGalleryClient />
      </main>
      <Footer />
      <ScrollToTop />
      <AudioPlayer />
    </>
  );
}
