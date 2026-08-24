"use client";

import { useState } from "react";
import WishCard from "@/components/ui/WishCard";
import Button from "@/components/ui/Button";
import { getApprovedWishes } from "@/app/actions/wish";

interface DbWish {
  id: string;
  name: string;
  message: string;
  relationship: string | null;
}

interface WishesArchiveProps {
  initialWishes: DbWish[];
  totalWishes: number;
}

const PAGE_SIZE = 12;

export default function WishesArchive({ initialWishes, totalWishes }: WishesArchiveProps) {
  const [wishes, setWishes] = useState<DbWish[]>(initialWishes);
  const [loading, setLoading] = useState(false);

  const hasMore = wishes.length < totalWishes;

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const more = await getApprovedWishes(wishes.length, PAGE_SIZE);
      setWishes((prev) => [...prev, ...more]);
    } catch (error) {
      console.error("Failed to load more wishes", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pb-20">
      {wishes.length === 0 ? (
        <div className="min-h-[40vh] flex items-center justify-center border border-dashed border-[#B89558] rounded-xl p-8 mx-4 md:mx-auto max-w-4xl">
          <p className="text-body text-[#6B6560] italic opacity-80 text-center">
            Beautiful wishes will appear here soon.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {wishes.map((wish) => (
              <div key={wish.id} className="w-full flex flex-col h-full">
                <WishCard
                  guestName={wish.name}
                  message={wish.message}
                  relationship={wish.relationship}
                  avatar={null}
                />
              </div>
            ))}
          </div>
          
          {hasMore && (
            <div className="mt-16 flex justify-center">
              <Button variant="secondary" onClick={loadMore} disabled={loading}>
                {loading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
