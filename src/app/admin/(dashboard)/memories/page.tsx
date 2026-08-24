import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ModerationButtons } from "@/components/admin/ModerationButtons";
import { PreviewableImage } from "@/components/admin/PreviewableImage";
import { approveMemory, rejectMemory, deleteMemory } from "@/app/actions/admin";

export default async function MemoriesManagementPage(props: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  
  const searchParams = await props.searchParams;
  const statusFilter = searchParams.status || "PENDING";

  const whereClause = statusFilter === "ALL" ? {} : { status: statusFilter as any };
  
  const memories = await prisma.memory.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" }
  });

  const tabs = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "All", value: "ALL" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Memories</h1>
        
        <div className="flex bg-gray-100/80 p-1 rounded-lg overflow-x-auto scrollbar-hide border border-gray-200/60 shadow-inner">
          {tabs.map(tab => (
            <Link
              key={tab.value}
              href={`/admin/memories?status=${tab.value}`}
              className={`px-4 sm:px-5 py-2 sm:py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                statusFilter === tab.value 
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200/50" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {memories.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm bg-gray-50/50">
            No memories found in this category.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {memories.map(memory => (
              <li key={memory.id} className="p-5 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-5 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="font-semibold text-gray-900 text-base">{memory.name}</h3>
                    {memory.relationship && (
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] sm:text-[11px] uppercase tracking-wider font-medium rounded-full border border-gray-200/50">
                        {memory.relationship}
                      </span>
                    )}
                    <span className={`px-2.5 py-0.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold rounded-full border ${
                      memory.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                      memory.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {memory.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed break-words">{memory.memory}</p>
                  
                  {/* Photo thumbnail inside content area on mobile so it doesn't break layout */}
                  {memory.photoUrl && (
                    <div className="md:hidden mt-4 w-24 h-24 relative rounded-md overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                      <PreviewableImage src={memory.photoUrl} />
                    </div>
                  )}

                  <p className="text-[11px] text-gray-400 mt-4 uppercase tracking-wider font-medium">
                    {new Date(memory.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className="shrink-0 flex flex-col items-start md:items-end gap-4 border-t border-gray-100 md:border-0 pt-4 mt-2 md:pt-0 md:mt-0">
                  {/* Photo on desktop only to keep it on the right side cleanly */}
                  {memory.photoUrl && (
                    <div className="hidden md:block w-32 h-32 relative rounded-md overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                      <PreviewableImage src={memory.photoUrl} />
                    </div>
                  )}
                  <ModerationButtons 
                    type="Memory"
                    id={memory.id} 
                    status={memory.status}
                    onApprove={approveMemory}
                    onReject={rejectMemory}
                    onDelete={deleteMemory}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
