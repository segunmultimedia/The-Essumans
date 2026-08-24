import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MemoriesArchive from "@/components/archive/MemoriesArchive";
import Link from "next/link";

export const revalidate = 60; // Cache invalidation

export default async function MemoriesPage() {
  const PAGE_SIZE = 12;

  // Fetch initial batch
  const initialMemories = await prisma.memory.findMany({
    where: { status: "APPROVED" },
    orderBy: { approvedAt: "desc" },
    take: PAGE_SIZE,
    select: {
      id: true,
      name: true,
      memory: true,
      relationship: true,
      photoUrl: true,
    }
  });

  const totalMemories = await prisma.memory.count({
    where: { status: "APPROVED" }
  });

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-16 bg-[#FBF7F1]">
        <div className="container-e">
          <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto px-5">
            <Link 
              href="/#memories" 
              className="inline-flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-[#9A948F] hover:text-[#5C202C] transition-colors mb-8"
            >
              <span>←</span> Back to Home
            </Link>
            
            <p className="text-eyebrow text-[#5C202C] mb-4">People & Stories</p>
            <h1 className="text-section-heading text-[#1E1E1E] mb-5">
              Shared Memories
            </h1>
            <p className="text-body text-[#6B6560]">
              Moments, stories and memories shared with Kwabena & Kristine.
            </p>
          </div>

          <MemoriesArchive 
            initialMemories={initialMemories} 
            totalMemories={totalMemories} 
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
