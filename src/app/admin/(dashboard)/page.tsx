import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  await requireAdmin();

  // Fetch counts in parallel
  const [
    pendingWishes, approvedWishes, rejectedWishes, totalWishes,
    pendingMemories, approvedMemories, rejectedMemories, totalMemories,
    recentWishes, recentMemories
  ] = await Promise.all([
    prisma.wish.count({ where: { status: "PENDING" } }),
    prisma.wish.count({ where: { status: "APPROVED" } }),
    prisma.wish.count({ where: { status: "REJECTED" } }),
    prisma.wish.count(),
    prisma.memory.count({ where: { status: "PENDING" } }),
    prisma.memory.count({ where: { status: "APPROVED" } }),
    prisma.memory.count({ where: { status: "REJECTED" } }),
    prisma.memory.count(),
    prisma.wish.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.memory.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
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
            <div className="p-5 md:p-6 bg-white text-center md:text-left">
              <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Published</p>
              <p className="text-2xl font-medium text-gray-900">{approvedWishes}</p>
            </div>
            <div className="p-5 md:p-6 bg-white text-center md:text-left">
              <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Deleted</p>
              <p className="text-2xl font-medium text-gray-900">{rejectedWishes}</p>
            </div>
            <div className="p-5 md:p-6 bg-white text-center md:text-left">
              <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Total</p>
              <p className="text-2xl font-medium text-gray-900">{totalWishes}</p>
            </div>
          </div>
          {pendingWishes > 0 && (
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 flex justify-between items-center">
              <span className="text-sm text-amber-800 font-medium">{pendingWishes} Legacy Pending Review</span>
              <Link href="/admin/wishes?status=PENDING" className="text-xs font-bold text-amber-900 uppercase tracking-wider hover:underline">Review &rarr;</Link>
            </div>
          )}
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
            <div className="p-5 md:p-6 bg-white text-center md:text-left">
              <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Published</p>
              <p className="text-2xl font-medium text-gray-900">{approvedMemories}</p>
            </div>
            <div className="p-5 md:p-6 bg-white text-center md:text-left">
              <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Deleted</p>
              <p className="text-2xl font-medium text-gray-900">{rejectedMemories}</p>
            </div>
            <div className="p-5 md:p-6 bg-white text-center md:text-left">
              <p className="text-[11px] md:text-xs font-semibold text-gray-500 tracking-wider uppercase mb-1">Total</p>
              <p className="text-2xl font-medium text-gray-900">{totalMemories}</p>
            </div>
          </div>
          {pendingMemories > 0 && (
            <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 flex justify-between items-center">
              <span className="text-sm text-amber-800 font-medium">{pendingMemories} Legacy Pending Review</span>
              <Link href="/admin/memories?status=PENDING" className="text-xs font-bold text-amber-900 uppercase tracking-wider hover:underline">Review &rarr;</Link>
            </div>
          )}
        </section>
        
        {/* Recent Submissions */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold tracking-widest text-gray-900 uppercase">Recent Submissions</h2>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {recentWishes.length === 0 && recentMemories.length === 0 ? (
              <div className="p-6 text-center text-sm text-gray-500">No recent submissions.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {[...recentWishes.map(w => ({ ...w, _type: 'Wish' as const })), ...recentMemories.map(m => ({ ...m, _type: 'Memory' as const }))]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((item) => (
                    <li key={item.id} className="p-4 hover:bg-gray-50">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name} <span className="text-xs font-normal text-gray-500 ml-2 border border-gray-200 px-2 py-0.5 rounded-full">{item._type}</span></p>
                          <p className="text-xs text-gray-500 mt-1 truncate max-w-md">{item._type === 'Wish' ? (item as any).message : (item as any).memory}</p>
                        </div>
                        <div className="text-right">
                           <span className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-full ${
                            item.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                            item.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {item.status}
                          </span>
                          <p className="text-[10px] text-gray-400 mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
