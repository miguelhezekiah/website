'use client';

import { useState, useRef, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Onest, Roboto_Mono } from 'next/font/google';

const onest = Onest({ subsets: ['latin'], weight: ['100', '300', '500', '700'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['100', '300', '500'] });

// --- INTERFACES ---
interface Tag { id: string; name: string; }
export interface LibraryItem {
  id: string;
  collectionId: string;
  title: string;
  category: string;
  cover_image: string;
  properties: Record<string, any>;
  expand?: { tags?: Tag[] };
}

function getImageUrl(collectionId: string, recordId: string, fileName: string) {
  return `https://studio-bluprnt-db.pockethost.io/api/files/${collectionId}/${recordId}/${fileName}`;
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

export default function LibraryGrid({ items }: { items: LibraryItem[] }) {
  // --- STATE ---
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(null);
  
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
    <div className={`relative w-screen h-screen overflow-hidden bg-white text-black ${onest.className} selection:bg-black selection:text-white`}>
      
      {/* --- FLOATING NAVBAR --- */}
      <header className="fixed top-0 left-0 w-full flex justify-between items-center gap-24 px-8 py-6 z-50 pointer-events-none">
        
        {/* Logo */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <Image src="/logo-black.png" alt="Logo" width={32} height={32} priority />
          <span className="text-3xl tracking-tighter pt-1 font-medium">VisualLibrary</span>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col items-end gap-2 pointer-events-auto relative">
          <div className="flex items-center gap-6">
            <a href="/upload" className="flex items-center gap-2 text-sm font-medium tracking-tight hover:opacity-50 transition-opacity pt-1">
                +Item
            </a>
            <NavButton onClick={() => setIsFilterOpen(!isFilterOpen)} active={isFilterOpen}>
              Filter
              <motion.svg animate={{ rotate: isFilterOpen ? 180 : 0 }} width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </NavButton>
            <NavButton onClick={() => { setIsSearchOpen(!isSearchOpen); setIsFilterOpen(false); }}>
                Search
            </NavButton>
          </div>

          {/* Filter Dropdown */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div 
                key="filter-menu"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-4 right-0 w-72 bg-white border border-neutral-200 shadow-2xl p-6 flex flex-col gap-6"
              >
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest text-neutral-400 mb-3 border-b border-neutral-100 pb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {uniqueCategories.map(cat => (
                      <button 
                        key={cat} onClick={() => toggleFilter(cat, activeCategories, setActiveCategories)}
                        className={`px-2 py-1 text-xs border uppercase tracking-wider transition-colors ${activeCategories.includes(cat) ? 'bg-black text-white border-black' : 'text-neutral-600 border-neutral-200 hover:border-neutral-400'}`}
                      >
                        {cat.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {uniqueTags.length > 0 && (
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-neutral-400 mb-3 border-b border-neutral-100 pb-2">Parameters</h3>
                    <div className="flex flex-wrap gap-2">
                      {uniqueTags.map(tag => (
                        <button 
                          key={tag} onClick={() => toggleFilter(tag, activeTags, setActiveTags)}
                          className={`px-2 py-1 text-xs border uppercase tracking-wider transition-colors ${activeTags.includes(tag) ? 'bg-neutral-800 text-white border-neutral-800' : 'text-neutral-600 border-neutral-200 hover:border-neutral-400'}`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Search Input Box */}
            {isSearchOpen && (
              <motion.div
                key="search-menu"
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="absolute top-full mt-4 right-0 w-72 bg-white border border-neutral-200 shadow-2xl p-2"
              >
                <input 
                  type="text"
                  autoFocus
                  placeholder="Query titles, tags, or JSON parameters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full px-4 py-3 text-sm focus:outline-none placeholder:text-neutral-400 ${robotoMono.className}`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

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

      {/* --- FLOATING FOOTER --- */}
      <footer className="fixed bottom-0 left-0 w-full flex flex-col sm:flex-row justify-between items-center px-8 py-6 z-50 pointer-events-none bg-gradient-to-t from-white/80 to-transparent">
        <div className="pointer-events-auto mb-4 sm:mb-0 text-sm">
            <span className={`${robotoMono.className} font-extralight tracking-tight`}>studiobluprnt</span>'s VisualLibrary            
        </div>
        <div className="flex gap-8 pointer-events-auto">
            <NavButton>Return home</NavButton>
            <NavButton>About us</NavButton>
        </div>
      </footer>

      {/* --- MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-md p-4" onClick={() => setSelectedItem(null)}
          >
             <motion.div 
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white border border-neutral-200 shadow-2xl p-8 max-w-4xl w-full flex flex-col md:flex-row h-[80vh]" onClick={e => e.stopPropagation()}
              >
                <div className="w-full md:w-1/2 relative bg-neutral-100 border-r border-neutral-200">
                   {selectedItem.cover_image && (
                     <Image src={getImageUrl(selectedItem.collectionId, selectedItem.id, selectedItem.cover_image)} alt={selectedItem.title} fill unoptimized className="object-cover" />
                   )}
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto">
                  <div className="flex justify-between items-start border-b border-neutral-200 pb-4 mb-6">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight mb-2">{selectedItem.title}</h2>
                      <span className="px-2 py-1 text-[10px] bg-black text-white uppercase tracking-widest">{selectedItem.category.replace('_', ' ')}</span>
                    </div>
                    <button onClick={() => setSelectedItem(null)} className="text-neutral-400 hover:text-black transition-colors">[ X ]</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedItem.expand?.tags?.map((tag) => (
                      <span key={tag.id} className="px-2 py-1 text-[10px] border border-neutral-300 text-neutral-600 uppercase tracking-wider">{tag.name}</span>
                    ))}
                  </div>
                  <div className="flex-grow">
                     <h3 className="text-xs text-neutral-400 mb-3 uppercase tracking-widest">Node Parameters</h3>
                     <pre className={`${robotoMono.className} text-[10px] leading-relaxed bg-neutral-50 text-neutral-800 p-4 border border-neutral-200 overflow-x-auto`}>
                        {JSON.stringify(selectedItem.properties, null, 2)}
                     </pre>
                  </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}