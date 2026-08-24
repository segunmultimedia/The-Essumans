import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ModerationButtons } from "@/components/admin/ModerationButtons";
import { approveWish, rejectWish, deleteWish } from "@/app/actions/admin";

export default async function WishesManagementPage(props: { searchParams: Promise<{ status?: string }> }) {
  await requireAdmin();
  
  const searchParams = await props.searchParams;
  const statusFilter = searchParams.status || "PENDING";

  const whereClause = statusFilter === "ALL" ? {} : { status: statusFilter as any };
  
  const wishes = await prisma.wish.findMany({
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
        <h1 className="text-2xl font-semibold text-gray-900">Manage Wishes</h1>
        
        <div className="flex bg-gray-100/80 p-1 rounded-lg overflow-x-auto scrollbar-hide border border-gray-200/60 shadow-inner">
          {tabs.map(tab => (
            <Link
              key={tab.value}
              href={`/admin/wishes?status=${tab.value}`}
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
        {wishes.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-sm bg-gray-50/50">
            No wishes found in this category.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {wishes.map(wish => (
              <li key={wish.id} className="p-5 sm:p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-4 justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <h3 className="font-semibold text-gray-900 text-base">{wish.name}</h3>
                    {wish.relationship && (
                      <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] sm:text-[11px] uppercase tracking-wider font-medium rounded-full border border-gray-200/50">
                        {wish.relationship}
                      </span>
                    )}
                    <span className={`px-2.5 py-0.5 text-[10px] sm:text-[11px] uppercase tracking-wider font-bold rounded-full border ${
                      wish.status === 'APPROVED' ? 'bg-green-50 text-green-700 border-green-200' :
                      wish.status === 'REJECTED' ? 'bg-red-50 text-red-700 border-red-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {wish.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed break-words">{wish.message}</p>
                  <p className="text-[11px] text-gray-400 mt-4 uppercase tracking-wider font-medium">
                    {new Date(wish.createdAt).toLocaleString()}
                  </p>
                </div>
                
                <div className="shrink-0 md:pt-0 border-t border-gray-100 md:border-0 pt-4 mt-2 md:mt-0">
                  <ModerationButtons 
                    type="Wish"
                    id={wish.id} 
                    status={wish.status}
                    onApprove={approveWish}
                    onReject={rejectWish}
                    onDelete={deleteWish}
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
