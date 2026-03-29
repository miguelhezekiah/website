'use client';

import { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import GlobalHeader from './GlobalHeader';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Onest, Roboto_Mono } from 'next/font/google';
import GlobalFooter from './GlobalFooter';

const onest = Onest({ subsets: ['latin'], weight: ['100', '300', '500', '700'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['100', '300', '500'] });

// --- INTERFACES ---
interface Tag { id: string; name: string; }
export interface ProjectItem {
  id: string;
  collectionId: string;
  title: string;
  category: string;
  cover_image: string;
  properties: Record<string, any>;
  expand?: { tags?: Tag[] };
}

// --- REUSABLE UI COMPONENTS ---
// This drastically reduces clutter in your layout JSX
const NavButton = ({ children, onClick, active }: { children: React.ReactNode; onClick?: () => void; active?: boolean }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 text-sm font-medium tracking-tight hover:opacity-50 transition-opacity pt-1 ${active ? 'opacity-50' : ''}`}
  >
    {children}
  </button>
);

export default function ProjectGrid({ items }: { items: ProjectItem[] }) {
  // --- STATE ---
  const [selectedItem, setSelectedItem] = useState<ProjectItem | null>(null);
  
  // UI Toggles
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Filter Parameters
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const boundaryRef = useRef<HTMLDivElement>(null);

  // --- TAXONOMY ---
  const uniqueCategories = Array.from(new Set(items.map(item => item.category)));
  const uniqueTags = Array.from(new Set(items.flatMap(item => item.expand?.tags?.map(t => t.name) || [])));

  // --- INTERCEPTOR LOGIC (Deep Search + Filters) ---
  const filteredItems = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    
    return items.filter((item) => {
      // 1. Faceted Category Match
      const categoryMatch = activeCategories.length === 0 || activeCategories.includes(item.category);
      
      // 2. Faceted Tag Match
      const itemTags = item.expand?.tags?.map(t => t.name) || [];
      const tagMatch = activeTags.length === 0 || activeTags.some(t => itemTags.includes(t));
      
      // 3. Deep Text Match (Title, Category, Tags, AND JSON payload)
      const searchMatch = !searchQuery || 
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery) ||
        itemTags.some(t => t.toLowerCase().includes(lowerQuery)) ||
        JSON.stringify(item.properties).toLowerCase().includes(lowerQuery);

      return categoryMatch && tagMatch && searchMatch;
    });
  }, [items, activeCategories, activeTags, searchQuery]);

  // Tile the filtered items
  const tiledItems = Array(16).fill(filteredItems).flat().map((item, index) => ({
    ...item,
    uniqueGridId: `${item.id}-${index}` 
  }));

  // Helper function to toggle faceted filters
  const toggleFilter = (value: string, currentArray: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(currentArray.includes(value) ? currentArray.filter(v => v !== value) : [...currentArray, value]);
  };

  // Helper functions for UI exclusivity
  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
    if (!isFilterOpen) setIsSearchOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) setIsFilterOpen(false);
  };

  return (
    // By placing onest.className here, the entire app inherits the font automatically
    <div className={`relative w-screen h-screen overflow-hidden bg-#fefefe text-black ${onest.className} selection:bg-black selection:text-#fefefe`}>

      {/* --- THE DRAGGABLE SPATIAL CANVAS --- */}
      <div ref={boundaryRef} className="absolute inset-0 z-0">
        <motion.div
          drag dragConstraints={boundaryRef} dragElastic={0.1} whileDrag={{ cursor: "grabbing" }}
          className="w-[300vw] h-[300vh] sm:w-[200vw] sm:h-[200vh] absolute top-[-50vh] left-[-50vw] cursor-grab flex flex-wrap content-start p-32 gap-8 md:gap-16"
        >
          {tiledItems.length === 0 ? (
             <div className="w-full h-[50vh] flex items-center justify-center text-neutral-400 text-sm tracking-widest uppercase">
                No items match the current parameters.
             </div>
          ) : (
            tiledItems.map((item) => (
            <div 
              key={item.uniqueGridId} onDoubleClick={() => setSelectedItem(item)}
              className="relative w-[40vw] sm:w-[20vw] lg:w-[12vw] aspect-square bg-neutral-100 group overflow-hidden transition-transform duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl"
            >
              {item.cover_image ? (
                <Image
                  src={item.cover_image} alt={item.title} fill unoptimized
                  className="object-cover opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-[10px] text-neutral-400 uppercase tracking-widest px-4 text-center">
                  {item.title}
                </div>
              )}
            </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}