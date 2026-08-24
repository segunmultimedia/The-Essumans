import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WishesArchive from "@/components/archive/WishesArchive";
import Link from "next/link";

export const revalidate = 60; // Cache invalidation

export default async function WishesPage() {
  const PAGE_SIZE = 12;

  // Fetch initial batch
  const initialWishes = await prisma.wish.findMany({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" },
    take: PAGE_SIZE,
    select: {
      id: true,
      name: true,
      message: true,
      relationship: true,
    }
  });

  const totalWishes = await prisma.wish.count({
    where: { status: "APPROVED" }
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-16 bg-[#FBF7F1]">
        <div className="container-e">
          <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto px-5">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#9A948F] hover:text-[#5C202C] transition-colors mb-8"
            >
              <span>←</span> Back to Home
            </Link>
            
            <p className="text-eyebrow text-[#5C202C] mb-4">Guest Wishes</p>
            <h1 className="text-section-heading text-[#1E1E1E] mb-5">
              Words From The Heart
            </h1>
            <p className="text-body text-[#6B6560]">
              Beautiful words shared for Kwabena & Kristine.
            </p>
          </div>

          <WishesArchive 
            initialWishes={initialWishes} 
            totalWishes={totalWishes} 
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
