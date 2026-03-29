'use client';

import { useState, useEffect } from 'react';
import { Onest, Roboto_Mono } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../../lib/supabase';
import SketchContent from '../../components/SketchContent';

const onest = Onest({ subsets: ['latin'], weight: ['300', '500', '700'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['300', '500'] });

export default function SketchesFixedGallery() {
  const [sketches, setSketches] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch the data from your new Supabase table
  useEffect(() => {
    async function fetchSketches() {
      const { data, error } = await supabase
        .from('sketches')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching sketches:', error);
      if (data) setSketches(data);
      setLoading(false);
    }
    fetchSketches();
  }, []);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % sketches.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + sketches.length) % sketches.length);

  if (loading) return <div className="h-screen w-full flex items-center justify-center font-mono text-sm uppercase tracking-widest text-neutral-400">Loading spatial node...</div>;
  if (sketches.length === 0) return <div className="h-screen w-full flex items-center justify-center font-mono text-sm uppercase tracking-widest text-neutral-400">No sketches in database.</div>;

  const currentSketch = sketches[currentIndex];

  return (
    // 1. THE VIEWPORT LOCK: h-screen and overflow-hidden prevent any scrolling
    <div className={`h-screen w-full overflow-hidden bg-neutral-50 text-black ${onest.className}`}>
      
      {/* 2. THE 3-COLUMN SPLIT */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full">
        
        {/* Left Side: Image Viewer (2 Columns, full height, no outer margins) */}
        <div className="md:col-span-2 relative h-full w-full flex items-center justify-center group bg-transparent">
          
          <AnimatePresence mode="wait">
            {currentSketch.image_url?.toLowerCase().match(/\.(mp4|webm)(\?.*)?$/) ? (
              // RENDER VIDEO FOR ANIMATIONS
              <motion.video
                key={currentSketch.id}
                src={currentSketch.image_url}
                autoPlay
                loop
                muted
                playsInline
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-contain p-8 md:p-16 pt-32"
              />
            ) : (
              // RENDER IMAGE FOR STATIC SKETCHES & TRUE GIFS
              <motion.img
                key={currentSketch.id}
                src={currentSketch.image_url}
                alt={currentSketch.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-contain p-8 md:p-16 pt-32" 
              />
            )}
          </AnimatePresence>

          {/* Navigation Overlay (Appears on hover) */}
          <div className="absolute inset-0 flex items-center justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <button onClick={handlePrev} className="w-16 h-16 bg-neutral-100/50 backdrop-blur-md flex items-center justify-center hover:bg-black hover:text-white transition-colors pointer-events-auto rounded-full text-lg">←</button>
            <button onClick={handleNext} className="w-16 h-16 bg-neutral-100/50 backdrop-blur-md flex items-center justify-center hover:bg-black hover:text-white transition-colors pointer-events-auto rounded-full text-lg">→</button>
          </div>
        </div>

        {/* Right Side: Data Panel (1 Column, full height, anchored right) */}
        <div className="md:col-span-1 h-full flex flex-col justify-center p-8 md:p-16 border-l border-neutral-200 bg-neutral-50 z-10 pt-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSketch.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{currentSketch.title}</h2>
              
              <div className="flex flex-col gap-6 mb-8 border-b border-neutral-200 pb-8">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Medium</div>
                  <div className={`${robotoMono.className} text-sm`}>{currentSketch.medium}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Year</div>
                  <div className={`${robotoMono.className} text-sm`}>{currentSketch.year}</div>
                </div>
              </div>

              <p className="text-neutral-600 leading-relaxed text-sm md:text-base">
                {currentSketch.description}
              </p>

              {/* Progress Indicator */}
              <div className={`${robotoMono.className} text-xs text-neutral-400 uppercase tracking-widest mt-16`}>
                {currentIndex + 1} / {sketches.length}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}