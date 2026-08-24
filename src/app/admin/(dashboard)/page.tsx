import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireAdmin();

  // Fetch counts in parallel
  const [
    pendingWishes, approvedWishes, rejectedWishes,
    pendingMemories, approvedMemories, rejectedMemories
  ] = await Promise.all([
    prisma.wish.count({ where: { status: "PENDING" } }),
    prisma.wish.count({ where: { status: "APPROVED" } }),
    prisma.wish.count({ where: { status: "REJECTED" } }),
    prisma.memory.count({ where: { status: "PENDING" } }),
    prisma.memory.count({ where: { status: "APPROVED" } }),
    prisma.memory.count({ where: { status: "REJECTED" } }),
  ]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Manage wishes, memories, and quotes.</p>
      </div>

      <div className="space-y-6 md:space-y-8">
        {/* Wishes Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Wishes</h2>
            <Link href="/admin/wishes" className="text-sm font-medium text-[#5C202C] hover:text-[#4A1923]">
              Manage all &rarr;
            </Link>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:grid md:grid-cols-3 md:gap-px md:bg-gray-200 md:border-0">
            {/* Pending (Emphasized) */}
            <div className="p-5 md:p-6 bg-amber-50/50 md:bg-amber-50/80 flex flex-col justify-between border-b border-gray-100 md:border-b-0">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-amber-700 tracking-wider uppercase">Pending</p>
                <p className="text-3xl font-semibold text-amber-900">{pendingWishes}</p>
              </div>
              <Link 
                href="/admin/wishes?tab=pending" 
                className="w-full inline-flex justify-center items-center px-4 py-2 bg-amber-600 text-white text-xs font-medium rounded-md shadow-sm hover:bg-amber-700 transition-colors"
              >
                Review pending wishes &rarr;
              </Link>
            </div>
            
            {/* Approved & Rejected Row (Mobile side-by-side, Desktop distinct cells) */}
            <div className="grid grid-cols-2 md:col-span-2 md:grid-cols-2 bg-white">
              <div className="p-5 md:p-6 border-r border-gray-100 md:border-0 text-center md:text-left">
                <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Approved</p>
                <p className="text-2xl font-medium text-gray-900">{approvedWishes}</p>
              </div>
              <div className="p-5 md:p-6 text-center md:text-left">
                <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Rejected</p>
                <p className="text-2xl font-medium text-gray-900">{rejectedWishes}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Memories Section */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Memories</h2>
            <Link href="/admin/memories" className="text-sm font-medium text-[#5C202C] hover:text-[#4A1923]">
              Manage all &rarr;
            </Link>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:grid md:grid-cols-3 md:gap-px md:bg-gray-200 md:border-0">
            {/* Pending (Emphasized) */}
            <div className="p-5 md:p-6 bg-amber-50/50 md:bg-amber-50/80 flex flex-col justify-between border-b border-gray-100 md:border-b-0">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-amber-700 tracking-wider uppercase">Pending</p>
                <p className="text-3xl font-semibold text-amber-900">{pendingMemories}</p>
              </div>
              <Link 
                href="/admin/memories?tab=pending" 
                className="w-full inline-flex justify-center items-center px-4 py-2 bg-amber-600 text-white text-xs font-medium rounded-md shadow-sm hover:bg-amber-700 transition-colors"
              >
                Review pending memories &rarr;
              </Link>
            </div>
            
            {/* Approved & Rejected Row */}
            <div className="grid grid-cols-2 md:col-span-2 md:grid-cols-2 bg-white">
              <div className="p-5 md:p-6 border-r border-gray-100 md:border-0 text-center md:text-left">
                <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Approved</p>
                <p className="text-2xl font-medium text-gray-900">{approvedMemories}</p>
              </div>
              <div className="p-5 md:p-6 text-center md:text-left">
                <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Rejected</p>
                <p className="text-2xl font-medium text-gray-900">{rejectedMemories}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
