"use client";

import { useTransition, useState, useEffect } from "react";

interface ModerationButtonsProps {
  type: "Wish" | "Memory";
  id: string;
  status: string;
  onRestore: (id: string) => Promise<void>;
  onSoftDelete: (id: string) => Promise<void>;
  onHardDelete: (id: string) => Promise<void>;
}

export function ModerationButtons({ type, id, status, onRestore, onSoftDelete, onHardDelete }: ModerationButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!isPending) setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, isPending]);

  const handleRestore = () => {
    startTransition(async () => {
      await onRestore(id);
    });
  };

  const handleSoftDelete = () => {
    startTransition(async () => {
      await onSoftDelete(id);
    });
  };

  const openDeleteModal = () => setIsModalOpen(true);
  const closeDeleteModal = () => {
    if (!isPending) setIsModalOpen(false);
  };

  const handleConfirmHardDelete = () => {
    startTransition(async () => {
      await onHardDelete(id);
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
        {status !== "APPROVED" && (
          <button
            onClick={handleRestore}
            disabled={isPending}
            className="h-11 sm:h-8 px-3 text-sm sm:text-xs font-medium text-white bg-green-600 rounded-md sm:rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {status === "PENDING" ? "Approve" : "Restore"}
          </button>
        )}
        
        {status !== "REJECTED" && (
          <button
            onClick={handleSoftDelete}
            disabled={isPending}
            className="h-11 sm:h-8 px-3 text-sm sm:text-xs font-medium text-amber-700 bg-amber-100 rounded-md sm:rounded hover:bg-amber-200 disabled:opacity-50 transition-colors"
          >
            Delete
          </button>
        )}

        {(status === "REJECTED" || status === "PENDING") && (
          <button
            onClick={openDeleteModal}
            disabled={isPending}
            className="h-11 sm:h-8 px-3 text-sm sm:text-xs font-medium text-red-700 bg-red-100 rounded-md sm:rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
          >
            Delete Permanently
          </button>
        )}
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1E1E1E]/40 backdrop-blur-sm"
          onClick={closeDeleteModal}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-serif text-[#5C202C] mb-3">
                Delete this {type.toLowerCase()}?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {type === "Wish" 
                  ? "This will permanently remove this wish from the website and database. This action cannot be undone."
                  : "This will permanently remove this memory from the website and database. If it contains a photo, the uploaded photo will also be removed. This action cannot be undone."
                }
              </p>
            </div>
            
            <div className="bg-[#FBF7F1] px-6 py-4 md:px-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-[#B89558]/20">
              <button
                onClick={closeDeleteModal}
                disabled={isPending}
                className="h-11 sm:h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmHardDelete}
                disabled={isPending}
                className="h-11 sm:h-10 px-4 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center order-1 sm:order-2"
              >
                {isPending ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
