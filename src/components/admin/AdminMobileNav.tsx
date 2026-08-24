"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { logoutAction } from "@/app/actions/auth";

export default function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: "Overview", path: "/admin" },
    { name: "Wishes", path: "/admin/wishes" },
    { name: "Memories", path: "/admin/memories" },
    { name: "Kwabena Once Said", path: "/admin/quotes" },
  ];

  return (
    <>
      <div className="md:hidden flex items-center justify-between bg-white px-5 py-4 border-b border-gray-200 sticky top-0 z-40 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div>
          <h2 className="text-[9px] font-bold tracking-widest text-[#B89558] uppercase mb-0.5">The Essumans</h2>
          <p className="text-base font-serif font-medium text-[#5C202C] leading-none">Administration</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 -mr-2 text-[#1E1E1E] hover:text-[#5C202C] focus:outline-none focus:bg-[#FBF7F1] rounded-md transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#1E1E1E]/40 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 bottom-0 w-[280px] bg-[#FBF7F1] shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-6 border-b border-[#B89558]/20">
                <span className="font-serif text-xl text-[#5C202C]">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-[#6B6560] hover:text-[#5C202C] focus:outline-none transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={"block px-4 py-3.5 rounded-md text-sm font-medium tracking-wide transition-colors "}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-6 border-t border-[#B89558]/20">
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="w-full px-4 py-3.5 text-center text-sm font-medium tracking-wide uppercase text-red-600 bg-white border border-red-100 rounded-md hover:bg-red-50 hover:border-red-200 transition-colors"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
