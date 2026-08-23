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
    <div className="max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Manage Memories</h1>
        
        <div className="flex bg-gray-100 p-1 rounded-lg overflow-x-auto">
          {tabs.map(tab => (
            <Link
              key={tab.value}
              href={`/admin/memories?status=${tab.value}`}
              className={`px-3 sm:px-4 py-1.5 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
                statusFilter === tab.value 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {memories.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No memories found in this category.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {memories.map(memory => (
              <li key={memory.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row gap-6 justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-medium text-gray-900">{memory.name}</h3>
                      {memory.relationship && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] uppercase tracking-wider rounded-full">
                          {memory.relationship}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 text-[11px] uppercase tracking-wider font-medium rounded-full ${
                        memory.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                        memory.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {memory.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{memory.memory}</p>
                    <p className="text-[11px] text-gray-400 mt-3 uppercase tracking-wider">
                      Submitted: {new Date(memory.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  {memory.photoUrl && (
                    <div className="shrink-0 w-32 h-32 relative rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <PreviewableImage src={memory.photoUrl} />
                    </div>
                  )}
                  
                  <div className="shrink-0 flex flex-col justify-start">
                    <ModerationButtons 
                      type="Memory"
                      id={memory.id} 
                      status={memory.status}
                      onApprove={approveMemory}
                      onReject={rejectMemory}
                      onDelete={deleteMemory}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
