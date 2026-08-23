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
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>

      <div className="space-y-8">
        {/* Wishes Section */}
        <section>
          <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
            <h2 className="text-sm font-semibold text-gray-700 tracking-wide uppercase">Wishes</h2>
            <Link href="/admin/wishes" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Manage &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-amber-600 mb-1 uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-medium text-gray-900">{pendingWishes}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-green-600 mb-1 uppercase tracking-wider">Approved</p>
              <p className="text-2xl font-medium text-gray-900">{approvedWishes}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-red-600 mb-1 uppercase tracking-wider">Rejected</p>
              <p className="text-2xl font-medium text-gray-900">{rejectedWishes}</p>
            </div>
          </div>
        </section>

        {/* Memories Section */}
        <section>
          <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-2">
            <h2 className="text-sm font-semibold text-gray-700 tracking-wide uppercase">Memories</h2>
            <Link href="/admin/memories" className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Manage &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-amber-600 mb-1 uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-medium text-gray-900">{pendingMemories}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-green-600 mb-1 uppercase tracking-wider">Approved</p>
              <p className="text-2xl font-medium text-gray-900">{approvedMemories}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
              <p className="text-xs font-medium text-red-600 mb-1 uppercase tracking-wider">Rejected</p>
              <p className="text-2xl font-medium text-gray-900">{rejectedMemories}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
