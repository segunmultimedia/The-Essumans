"use client";

import { useTransition, useState, useEffect } from "react";
import { createQuote, updateQuote, deleteQuote } from "@/app/actions/admin";

interface QuoteAdminControlsProps {
  quoteItem?: {
    id: string;
    quote: string;
    submittedBy: string;
    context: string | null;
  };
  isAdd?: boolean;
}

export function QuoteAdminControls({ quoteItem, isAdd }: QuoteAdminControlsProps) {
  const [isPending, startTransition] = useTransition();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Form State
  const [quote, setQuote] = useState(quoteItem?.quote || "");
  const [submittedBy, setSubmittedBy] = useState(quoteItem?.submittedBy || "");
  const [context, setContext] = useState(quoteItem?.context || "");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isPending) {
        setIsEditModalOpen(false);
        setIsDeleteModalOpen(false);
      }
    };
    if (isEditModalOpen || isDeleteModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPending, isEditModalOpen, isDeleteModalOpen]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (isAdd) {
        await createQuote({ quote, submittedBy, context });
        setQuote("");
        setSubmittedBy("");
        setContext("");
      } else if (quoteItem) {
        await updateQuote(quoteItem.id, { quote, submittedBy, context });
      }
      setIsEditModalOpen(false);
    });
  };

  const handleConfirmDelete = () => {
    if (!quoteItem) return;
    startTransition(async () => {
      await deleteQuote(quoteItem.id);
      setIsDeleteModalOpen(false);
    });
  };

  return (
    <>
      {isAdd ? (
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
        >
          Add New Quote
        </button>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIsEditModalOpen(true)}
            disabled={isPending}
            className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isPending}
            className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
          >
            Delete
          </button>
        </div>
      )}

      {isEditModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
          onClick={() => !isPending && setIsEditModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSave}>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isAdd ? "Add New Quote" : "Edit Quote"}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
                    <textarea 
                      required
                      value={quote}
                      onChange={e => setQuote(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B89558] focus:border-[#B89558]"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attributed By</label>
                    <input 
                      type="text"
                      required
                      value={submittedBy}
                      onChange={e => setSubmittedBy(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B89558] focus:border-[#B89558]"
                      placeholder="e.g. Kobby himself"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Context (Optional)</label>
                    <input 
                      type="text"
                      value={context}
                      onChange={e => setContext(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#B89558] focus:border-[#B89558]"
                      placeholder="e.g. On Kristine"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isPending}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-[#1E1E1E] rounded-lg hover:bg-black disabled:opacity-50 transition-colors"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
          onClick={() => !isPending && setIsDeleteModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Delete this quote?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This will permanently remove this quote from the website and database. This action cannot be undone.
              </p>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isPending}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
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
