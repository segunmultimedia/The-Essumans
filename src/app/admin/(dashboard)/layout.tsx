import { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import AdminMobileNav from "@/components/admin/AdminMobileNav";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // layout is server rendered, we can check session here for UI purposes,
  // but proxy.ts actually protects it. We won't block render if on /login.
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#1E1E1E] flex flex-col md:flex-row">
      
      {/* Mobile Top Navigation */}
      <AdminMobileNav />

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:block w-56 bg-white border-r border-gray-200 shrink-0 h-screen sticky top-0">
        <div className="p-8 h-full flex flex-col">
          <div className="mb-8">
            <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              The Essumans
            </h2>
            <p className="text-lg font-medium text-gray-900 mt-1">Administration</p>
          </div>
          <nav className="flex flex-col gap-4">
            <Link 
              href="/admin" 
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Overview
            </Link>
            <Link 
              href="/admin/wishes" 
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Wishes
            </Link>
            <Link 
              href="/admin/memories" 
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Memories
            </Link>
            <Link 
              href="/admin/quotes" 
              className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Kwabena Once Said
            </Link>
          </nav>

          <form action={logoutAction} className="mt-auto pt-8">
            <button 
              type="submit"
              className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
