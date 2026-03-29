'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Roboto_Mono } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['300', '500'] });

export default function SpatialGrid({ items }: { items: any[] }) {
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  if (!items || items.length === 0) {
    return <div className="text-sm font-mono text-neutral-400 uppercase tracking-widest p-8 pt-32">No nodes found.</div>;
  }

  return (
    <>
      <div className="w-full flex flex-col">
        {items.map((item) => (
          <div 
            key={item.id} 
            onDoubleClick={() => setSelectedNode(item)}
            className="grid grid-cols-1 md:grid-cols-3 w-full min-h-screen border-b border-neutral-200 last:border-b-0 group cursor-pointer selection:bg-transparent"
          >
            {/* IMAGE COLUMN */}
            <div className="md:col-span-2 relative w-full h-full flex items-center justify-center p-8 md:p-16">
              <img
                src={item.cover_image}
                alt={item.title}
                className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>

            {/* LABEL COLUMN */}
            <div className="md:col-span-1 flex flex-col justify-center p-8 md:p-16 bg-neutral-50/50">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 group-hover:text-neutral-500 transition-colors">
                {item.title}
              </h2>
              <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
                {item.category?.replace('_', ' ')}
              </div>
              
              <span className={`${robotoMono.className} text-[10px] uppercase tracking-widest text-neutral-400`}>
                Double-click to expand node →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* THE MINIPAGE MODAL */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-neutral-900/40 backdrop-blur-sm"
            onClick={() => setSelectedNode(null)} // Click outside to close
          >
            <motion.div 
              initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.98 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent click-through closing
            >
              {/* Modal Left: Cover Image */}
              <div className="bg-neutral-100 relative aspect-square md:aspect-auto">
                <img src={selectedNode.cover_image} alt={selectedNode.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              
              {/* Modal Right: Quick Data & Link */}
              <div className="p-8 md:p-12 flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold tracking-tight">{selectedNode.title}</h3>
                  <button onClick={() => setSelectedNode(null)} className="text-neutral-400 hover:text-black">✕</button>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2">Parametric Properties</h4>
                  <pre className={`${robotoMono.className} text-[10px] bg-neutral-50 p-4 border border-neutral-200 text-neutral-600 overflow-x-auto`}>
                    {JSON.stringify(selectedNode.properties, null, 2)}
                  </pre>
                </div>

                <div className="mt-auto pt-8">
                  <Link 
                    href={`/project?id=${selectedNode.id}`}
                    className="inline-block w-full text-center bg-black text-white px-6 py-3 text-xs uppercase tracking-widest hover:bg-neutral-800 transition-colors"
                  >
                    Read Full Documentation →
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}