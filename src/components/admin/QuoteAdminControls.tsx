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
          className="h-11 sm:h-9 px-5 text-sm font-medium text-white bg-[#5C202C] rounded-md hover:bg-[#4A1923] transition-colors w-full sm:w-auto"
        >
          Add New Quote
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-2 w-full sm:w-auto mt-4 sm:mt-0">
          <button
            onClick={() => setIsEditModalOpen(true)}
            disabled={isPending}
            className="h-11 sm:h-8 px-3 text-sm sm:text-xs font-medium text-gray-700 bg-gray-100 rounded-md sm:rounded hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={isPending}
            className="h-11 sm:h-8 px-3 text-sm sm:text-xs font-medium text-red-700 bg-red-100 rounded-md sm:rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
          >
            Delete
          </button>
        </div>
      )}

      {isEditModalOpen && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1E1E1E]/40 backdrop-blur-sm"
          onClick={() => !isPending && setIsEditModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSave} className="flex flex-col h-full">
              <div className="p-6 md:p-8 overflow-y-auto">
                <h3 className="text-xl font-serif text-[#5C202C] mb-6">
                  {isAdd ? "Add New Quote" : "Edit Quote"}
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-medium text-[#1E1E1E] mb-2 uppercase tracking-wide">Quote</label>
                    <textarea 
                      required
                      value={quote}
                      onChange={e => setQuote(e.target.value)}
                      className="w-full px-4 py-3 border border-[#B89558]/30 bg-[#FBF7F1]/50 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5C202C] focus:border-[#5C202C] transition-all text-[#1E1E1E]"
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1E1E1E] mb-2 uppercase tracking-wide">Attributed By</label>
                    <input 
                      type="text"
                      required
                      value={submittedBy}
                      onChange={e => setSubmittedBy(e.target.value)}
                      className="w-full px-4 py-3 border border-[#B89558]/30 bg-[#FBF7F1]/50 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5C202C] focus:border-[#5C202C] transition-all text-[#1E1E1E]"
                      placeholder="e.g. Kobby himself"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-[#1E1E1E] mb-2 uppercase tracking-wide">Context <span className="normal-case text-gray-500 font-normal tracking-normal">(Optional)</span></label>
                    <input 
                      type="text"
                      value={context}
                      onChange={e => setContext(e.target.value)}
                      className="w-full px-4 py-3 border border-[#B89558]/30 bg-[#FBF7F1]/50 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#5C202C] focus:border-[#5C202C] transition-all text-[#1E1E1E]"
                      placeholder="e.g. On Kristine"
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-[#FBF7F1] px-6 py-4 md:px-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-[#B89558]/20 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isPending}
                  className="h-11 sm:h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors order-2 sm:order-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="h-11 sm:h-10 px-6 text-sm font-medium text-white bg-[#5C202C] rounded-lg hover:bg-[#4A1923] disabled:opacity-50 transition-colors order-1 sm:order-2"
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
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#1E1E1E]/40 backdrop-blur-sm"
          onClick={() => !isPending && setIsDeleteModalOpen(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-serif text-[#5C202C] mb-3">
                Delete this quote?
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This will permanently remove this quote from the website and database. This action cannot be undone.
              </p>
            </div>
            
            <div className="bg-[#FBF7F1] px-6 py-4 md:px-8 flex flex-col sm:flex-row justify-end gap-3 border-t border-[#B89558]/20">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isPending}
                className="h-11 sm:h-10 px-4 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
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
