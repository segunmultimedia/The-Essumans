"use client";

import { useTransition, useState, useEffect } from "react";

interface ModerationButtonsProps {
  type: "Wish" | "Memory";
  id: string;
  status: string;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ModerationButtons({ type, id, status, onApprove, onReject, onDelete }: ModerationButtonsProps) {
  const [isPending, startTransition] = useTransition();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key press
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

  const handleApprove = () => {
    startTransition(async () => {
      await onApprove(id);
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      await onReject(id);
    });
  };

  const openDeleteModal = () => setIsModalOpen(true);
  const closeDeleteModal = () => {
    if (!isPending) setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      await onDelete(id);
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {status !== "APPROVED" && (
          <button
            onClick={handleApprove}
            disabled={isPending}
            className="px-3 py-1.5 text-xs font-medium text-white bg-green-600 rounded hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            Approve
          </button>
        )}
        {status !== "REJECTED" && (
          <button
            onClick={handleReject}
            disabled={isPending}
            className="px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-100 rounded hover:bg-amber-200 disabled:opacity-50 transition-colors"
          >
            Reject
          </button>
        )}
        <button
          onClick={openDeleteModal}
          disabled={isPending}
          className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
          onClick={closeDeleteModal}
        >
          <div 
            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete this {type.toLowerCase()}?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {type === "Wish" 
                  ? "This will permanently remove this wish from the website and database. This action cannot be undone."
                  : "This will permanently remove this memory from the website and database. If it contains a photo, the uploaded photo will also be removed. This action cannot be undone."
                }
              </p>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
              <button
                onClick={closeDeleteModal}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center"
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
