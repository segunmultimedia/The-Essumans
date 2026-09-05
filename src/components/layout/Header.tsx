"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import MobileNavigation from "./MobileNavigation";

const navLinks = [
  { label: "Home",           href: "/#home" },
  { label: "Our Story",      href: "/#our-story" },
  { label: "Gallery",        href: "/#gallery" },
  { label: "Wishes",         href: "/#wishes" },
  { label: "Kobby Said",     href: "/#kobby-once-said" },
  { label: "Memories",       href: "/#memories" },
];

export default function Header() {
  const [scrolled, setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        role="banner"
        className="fixed top-0 left-0 right-0 z-40 bg-[#FBF7F1] border-b border-[#B89558]/20 transition-all duration-400"
      >
        <div className="container-e h-[68px] md:h-[76px] flex items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/#home"
            aria-label="THE ESSUMAN'S — return to top"
            className="font-serif tracking-[0.22em] text-[15px] md:text-[17px] text-[#1E1E1E] transition-colors duration-400"
          >
            THE ESSUMANS
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-nav relative py-1 text-[#6B6560] hover:text-[#5C202C] transition-colors duration-250 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#5C202C] after:transition-[width] after:duration-300 hover:after:w-full focus-visible:after:w-full focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger — 44×44px minimum touch target */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="lg:hidden flex items-center justify-center w-11 h-11 -mr-2 text-[#1E1E1E] hover:text-[#5C202C] hover:scale-110 transition-all duration-250"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      <MobileNavigation
        id="mobile-nav"
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
