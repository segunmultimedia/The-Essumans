import { ReactNode } from "react";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // layout is server rendered, we can check session here for UI purposes,
  // but proxy.ts actually protects it. We won't block render if on /login.
  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans text-[#111827] flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-56 bg-white border-b md:border-b-0 md:border-r border-gray-200 shrink-0">
        <div className="p-6 md:p-6 lg:p-8">
          <div className="mb-8 hidden md:block">
            <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              The Essumans
            </h2>
            <p className="text-lg font-medium text-gray-900 mt-1">Administration</p>
          </div>
          <nav className="flex md:flex-col gap-2 md:gap-4 overflow-x-auto pb-4 md:pb-0">
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
            
            <form action={logoutAction} className="mt-auto hidden md:block pt-8">
              <button 
                type="submit"
                className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </form>
          </nav>
        </div>
      </aside>

      {/* Mobile top-right logout */}
      <div className="md:hidden absolute top-4 right-4">
        <form action={logoutAction}>
          <button 
            type="submit"
            className="px-3 py-1.5 text-xs font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </form>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
