'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

export default function GlobalHeader() {
  const pathname = usePathname();

  // 2. LOCAL UI STATE: Manage dropdown visibility internally
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 1. DYNAMIC TITLE ROUTER
  let pageTitle = "Projects";
  if (pathname === '/profile') pageTitle = "Profile";
  if (pathname === '/library') pageTitle = "VisualLibrary";
  if (pathname === '/upload') pageTitle = "AddItem";

  // 2. CHECK IF WE ARE ON THE HOME GRID
  const isHome = pathname === '/';

  const uniqueCategories: string[] = [];
  const uniqueTags: string[] = [];
  const activeCategories: string[] = [];
  const activeTags: string[] = [];
  const toggleFilter = (item: string, activeList: string[], setter: any) => {};


  
  return (
    // 1. The Wrapper: Manages the Z-index but ignores mouse clicks
    <header className="fixed top-0 left-0 w-full z-[100] flex flex-col group pointer-events-none">
      
      {/* 2. The Interactive Top Bar: Detects the hover and turns solid white */}
      <div className="w-full px-8 pt-6 pb-6 flex justify-between items-center gap-24 pointer-events-auto bg-transparent transition-colors duration-500 hover:bg-white text-black">
        
        {/* Logo & Dynamic Title */}
        <div className="flex items-center gap-3">
          <Image src="/logo-black.png" alt="Logo" width={32} height={32} priority />
          <span className="text-3xl tracking-tighter pt-1 font-medium">{pageTitle}</span>
        </div>
        
        {/* Actions & Menus */}
        {/* Actions (Only render right side if we are on the Home page, except for +Item) */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto relative">
          <div className="flex items-center gap-6">
    
              <Link href="/profile" className="flex items-center gap-2 text-sm font-medium tracking-tight hover:opacity-50 transition-opacity pt-1">
                  Profile
              </Link>
            
              {/* Always show +Item button */}
              <Link href="/" className="flex items-center gap-2 text-sm font-medium tracking-tight hover:opacity-50 transition-opacity pt-1">
                  Projects
              </Link>
    
              <Link href="/sketches" className="flex items-center gap-2 text-sm font-medium tracking-tight hover:opacity-50 transition-opacity pt-1">
                  Sketches
              </Link>
    
              <Link href="/library" className="flex items-center gap-2 text-sm font-medium tracking-tight hover:opacity-50 transition-opacity pt-1">
                  VisualLibrary
              </Link>
    
              <NavButton onClick={() => setIsFilterOpen?.(!isFilterOpen)} active={isFilterOpen}>
                  Filter
              <motion.svg animate={{ rotate: isFilterOpen ? 180 : 0 }} width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
              </NavButton>
              <NavButton onClick={() => { setIsSearchOpen?.(!isSearchOpen); setIsFilterOpen?.(false); }}>
                  Search
              </NavButton>
          </div>

          {/* Filter Dropdown */}
          <AnimatePresence>
            {isHome && isFilterOpen && (
              <motion.div 
                key="filter-menu"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-4 right-0 w-72 bg-white border border-neutral-200 shadow-2xl p-6 flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-neutral-400 mb-3 border-b border-neutral-100 pb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {uniqueCategories.map(cat => (
                      <button key={cat} onClick={() => toggleFilter(cat, activeCategories, () => {})} className="px-2 py-1 text-xs border uppercase tracking-wider transition-colors">
                        {cat.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Search Input Box */}
            {isHome && isSearchOpen && (
              <motion.div
                key="search-menu"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-4 right-0 w-72 bg-white border border-neutral-200 shadow-2xl p-2"
              >
                <input 
                  type="text" autoFocus placeholder="Query titles, tags, or JSON parameters..."
                  value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 text-sm focus:outline-none placeholder:text-neutral-400 font-mono"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. The Gradient Tail: Fades out the background, disappears completely when hovered */}
      <div className="w-full h-12 bg-gradient-to-b from-transparent to-#fefefe pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-500"></div>

    </header>
  );
}