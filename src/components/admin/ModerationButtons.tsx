"use client";

import { useTransition } from "react";

interface ModerationButtonsProps {
  id: string;
  status: string;
  onApprove: (id: string) => Promise<void>;
  onReject: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function ModerationButtons({ id, status, onApprove, onReject, onDelete }: ModerationButtonsProps) {
  const [isPending, startTransition] = useTransition();

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

  const handleDelete = () => {
    if (confirm("Are you sure you want to permanently delete this item?")) {
      startTransition(async () => {
        await onDelete(id);
      });
    }
  };

  return (
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
        onClick={handleDelete}
        disabled={isPending}
        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded hover:bg-red-200 disabled:opacity-50 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
