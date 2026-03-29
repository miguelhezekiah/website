'use client';

import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { Onest } from 'next/font/google';

const onest = Onest({ subsets: ['latin'], weight: ['300', '500', '700'] });

function NavButton({ onClick, active, children }: { onClick: () => void, active?: boolean, children: ReactNode }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2 text-sm font-medium tracking-tight transition-colors pt-1 ${active ? 'text-black' : 'text-neutral-500 hover:text-black'}`}
    >
      {children}
    </button>
  );
}

// We make the grid-specific props optional (?) so the component 
// doesn't crash when you use it on the Profile page.
interface GlobalFooterProps {
  isFilterOpen?: boolean;
  setIsFilterOpen?: (val: boolean) => void;
  isSearchOpen?: boolean;
  setIsSearchOpen?: (val: boolean) => void;
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  uniqueCategories?: string[];
  activeCategories?: string[];
  setActiveCategories?: (val: string[]) => void;
  uniqueTags?: string[];
  activeTags?: string[];
  setActiveTags?: (val: string[]) => void;
  toggleFilter?: (cat: string, active: string[], setter: (val: string[]) => void) => void;
  // Assuming you have a NavButton component elsewhere, otherwise define it here
  NavButton?: any; 
}

export default function GlobalFooter() {
  const pathname = usePathname();

  // 1. DYNAMIC TITLE ROUTER
  let pageTitle = "Projects";
  if (pathname === '/profile') pageTitle = "Profile";
  if (pathname === '/library') pageTitle = "VisualLibrary";
  if (pathname === '/upload') pageTitle = "AddItem";

  return (
    <footer className="fixed bottom-0 left-0 w-full flex flex-col sm:flex-row text-black justify-between items-center px-8 py-6 z-50 pointer-events-none bg-#fefefe">
      <p className={`${onest.className} text-[10px] uppercase tracking-widest text-black`}>
            © {new Date().getFullYear()} Miguel Hezekiah
      </p>
    </footer>
  );
}