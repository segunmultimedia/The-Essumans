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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#1E1E1E] font-serif tracking-wide">Dashboard</h1>
        <p className="text-sm text-[#6B6560] mt-1 font-serif italic">Manage your wishes, memories, and quotes.</p>
        <span className="block w-12 h-[2px] bg-[#5C202C] mt-4" aria-hidden="true" />
      </div>

      <div className="space-y-8 md:space-y-10">
        {/* Wishes Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-[#1E1E1E] uppercase">Wishes</h2>
            <Link href="/admin/wishes" className="text-xs md:text-sm font-medium text-[#5C202C] hover:text-[#4A1923] uppercase tracking-wider">
              Manage All &rarr;
            </Link>
          </div>
          
          <div className="bg-white rounded-[4px] border-t-[3px] border-t-[#5C202C] border border-[#E5E0D8] shadow-sm overflow-hidden grid grid-cols-3 divide-x divide-[#E5E0D8]">
            <div className="p-4 md:p-6 text-center">
              <p className="text-[10px] md:text-xs font-semibold text-[#9A948F] tracking-widest uppercase mb-1">Published</p>
              <p className="text-2xl md:text-3xl font-serif text-[#1E1E1E]">{approvedWishes}</p>
            </div>
            <div className="p-4 md:p-6 text-center">
              <p className="text-[10px] md:text-xs font-semibold text-[#9A948F] tracking-widest uppercase mb-1">Deleted</p>
              <p className="text-2xl md:text-3xl font-serif text-[#1E1E1E]">{rejectedWishes}</p>
            </div>
            <div className="p-4 md:p-6 text-center bg-[#FBF7F1]/30">
              <p className="text-[10px] md:text-xs font-semibold text-[#9A948F] tracking-widest uppercase mb-1">Total</p>
              <p className="text-2xl md:text-3xl font-serif text-[#5C202C]">{totalWishes}</p>
            </div>
          </div>
          {pendingWishes > 0 && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-[4px] p-4 flex justify-between items-center shadow-sm">
              <span className="text-xs md:text-sm text-amber-800 font-medium">{pendingWishes} Pending Review</span>
              <Link href="/admin/wishes?status=PENDING" className="text-xs font-bold text-amber-900 uppercase tracking-wider hover:underline">Review &rarr;</Link>
            </div>
          )}
        </section>

        {/* Memories Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-[#1E1E1E] uppercase">Memories</h2>
            <Link href="/admin/memories" className="text-xs md:text-sm font-medium text-[#5C202C] hover:text-[#4A1923] uppercase tracking-wider">
              Manage All &rarr;
            </Link>
          </div>
          
          <div className="bg-white rounded-[4px] border-t-[3px] border-t-[#5C202C] border border-[#E5E0D8] shadow-sm overflow-hidden grid grid-cols-3 divide-x divide-[#E5E0D8]">
            <div className="p-4 md:p-6 text-center">
              <p className="text-[10px] md:text-xs font-semibold text-[#9A948F] tracking-widest uppercase mb-1">Published</p>
              <p className="text-2xl md:text-3xl font-serif text-[#1E1E1E]">{approvedMemories}</p>
            </div>
            <div className="p-4 md:p-6 text-center">
              <p className="text-[10px] md:text-xs font-semibold text-[#9A948F] tracking-widest uppercase mb-1">Deleted</p>
              <p className="text-2xl md:text-3xl font-serif text-[#1E1E1E]">{rejectedMemories}</p>
            </div>
            <div className="p-4 md:p-6 text-center bg-[#FBF7F1]/30">
              <p className="text-[10px] md:text-xs font-semibold text-[#9A948F] tracking-widest uppercase mb-1">Total</p>
              <p className="text-2xl md:text-3xl font-serif text-[#5C202C]">{totalMemories}</p>
            </div>
          </div>
          {pendingMemories > 0 && (
            <div className="mt-3 bg-amber-50 border border-amber-200 rounded-[4px] p-4 flex justify-between items-center shadow-sm">
              <span className="text-xs md:text-sm text-amber-800 font-medium">{pendingMemories} Pending Review</span>
              <Link href="/admin/memories?status=PENDING" className="text-xs font-bold text-amber-900 uppercase tracking-wider hover:underline">Review &rarr;</Link>
            </div>
          )}
        </section>
        
        {/* Recent Submissions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-[#1E1E1E] uppercase">Recent Submissions</h2>
          </div>
          <div className="bg-white rounded-[4px] border-t-[3px] border-t-[#5C202C] border border-[#E5E0D8] shadow-sm overflow-hidden">
            {recentWishes.length === 0 && recentMemories.length === 0 ? (
              <div className="p-8 text-center text-sm text-[#9A948F] font-serif italic">No recent submissions.</div>
            ) : (
              <ul className="divide-y divide-[#E5E0D8]">
                {[...recentWishes.map(w => ({ ...w, _type: 'Wish' as const })), ...recentMemories.map(m => ({ ...m, _type: 'Memory' as const }))]
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 5)
                  .map((item) => (
                    <li key={item.id} className="p-4 md:p-5 hover:bg-[#FBF7F1]/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="text-sm font-bold text-[#1E1E1E] truncate">{item.name}</p>
                            <span className="text-[10px] font-semibold text-[#9A948F] uppercase tracking-wider border border-[#E5E0D8] bg-white px-2 py-0.5 rounded-[4px] shadow-sm">{item._type}</span>
                          </div>
                          <p className="text-xs md:text-sm text-[#6B6560] line-clamp-2 md:line-clamp-1 italic font-serif">
                            "{item._type === 'Wish' ? (item as any).message : (item as any).memory}"
                          </p>
                        </div>
                        <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-start gap-1 shrink-0 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-[#E5E0D8]/50">
                           <span className={`px-2 py-1 text-[9px] uppercase font-bold tracking-widest rounded-[4px] ${
                            item.status === 'APPROVED' ? 'bg-[#EAF3EA] text-[#2C5F2D]' :
                            item.status === 'REJECTED' ? 'bg-[#FBEAEA] text-[#9A2020]' :
                            'bg-[#FFF5E6] text-[#B87C2E]'
                          }`}>
                            {item.status}
                          </span>
                          <p className="text-[10px] font-medium text-[#9A948F] tracking-wide">
                            {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
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
