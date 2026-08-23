"use client";

import { useState } from "react";
import MemoryItem from "@/components/ui/MemoryItem";
import Button from "@/components/ui/Button";
import { getApprovedMemories } from "@/app/actions/memory";
import PhotoModal from "./PhotoModal";

interface DbMemory {
  id: string;
  name: string;
  memory: string;
  relationship: string | null;
  photoUrl: string | null;
}

interface MemoriesArchiveProps {
  initialMemories: DbMemory[];
  totalMemories: number;
}

const PAGE_SIZE = 12;

export default function MemoriesArchive({ initialMemories, totalMemories }: MemoriesArchiveProps) {
  const [memories, setMemories] = useState<DbMemory[]>(initialMemories);
  const [loading, setLoading] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const hasMore = memories.length < totalMemories;

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const more = await getApprovedMemories(memories.length, PAGE_SIZE);
      setMemories((prev) => [...prev, ...more]);
    } catch (error) {
      console.error("Failed to load more memories", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full pb-20">
      {memories.length === 0 ? (
        <div className="min-h-[40vh] flex items-center justify-center border border-dashed border-[#DDD8D0] rounded-xl p-8 mx-4 md:mx-auto max-w-4xl">
          <p className="text-body text-[#6B6560] italic opacity-80 text-center">
            Beautiful memories will appear here soon.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 max-w-6xl mx-auto px-5">
            {memories.map((memory) => (
              <div key={memory.id} className="w-full">
                <MemoryItem
                  contributorName={memory.name}
                  relationship={memory.relationship}
                  memory={memory.memory}
                  photo={memory.photoUrl}
                  isLast={false} // Keeps the elegant bottom border
                  onPhotoClick={memory.photoUrl ? () => setPreviewPhoto(memory.photoUrl!) : undefined}
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

      {previewPhoto && (
        <PhotoModal 
          src={previewPhoto} 
          alt="Memory photograph preview"
          onClose={() => setPreviewPhoto(null)} 
        />
      )}
    </div>
  );
}
