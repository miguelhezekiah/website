'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { Onest, Roboto_Mono } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import supabase from '../../lib/supabase';

const onest = Onest({ subsets: ['latin'], weight: ['300', '500', '700'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['300', '500'] });

function ProjectNode() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    async function fetchProject() {
      if (!id) return;
      const { data, error } = await supabase
        .from('library_items')
        .select('*')
        .eq('id', id)
        .single();

      if (error) console.error('Error fetching project:', error);
      if (data) setProject(data);
      setLoading(false);
    }
    fetchProject();
  }, [id]);

  if (loading) return <div className="h-screen w-full flex items-center justify-center font-mono text-sm uppercase tracking-widest text-neutral-400">Compiling node geometry...</div>;
  if (!project) return <div className="h-screen w-full flex items-center justify-center font-mono text-sm uppercase tracking-widest text-red-500">Node not found.</div>;

  // Combine cover image and gallery array for the slideshow
  const allImages = [project.cover_image, ...(project.image_gallery || [])].filter(Boolean);

  const handleNext = () => setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
  const handlePrev = () => setCurrentImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

  return (
    <div className={`h-screen w-full overflow-hidden bg-neutral-50 text-black ${onest.className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 h-full w-full">
        
        {/* Left Side: Interactive Viewer (2 Columns) */}
        <div className="md:col-span-2 relative h-full w-full flex items-center justify-center group bg-transparent border-r border-neutral-200">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImgIndex}
              src={allImages[currentImgIndex]}
              alt={`${project.title} - View ${currentImgIndex + 1}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full object-contain p-8 md:p-16 pt-32" 
            />
          </AnimatePresence>

          {allImages.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              <button onClick={handlePrev} className="w-16 h-16 bg-neutral-100/50 backdrop-blur-md flex items-center justify-center hover:bg-black hover:text-white transition-colors pointer-events-auto rounded-full text-lg">←</button>
              <button onClick={handleNext} className="w-16 h-16 bg-neutral-100/50 backdrop-blur-md flex items-center justify-center hover:bg-black hover:text-white transition-colors pointer-events-auto rounded-full text-lg">→</button>
            </div>
          )}
        </div>

        {/* Right Side: Computational Data Panel (1 Column) */}
        <div className="md:col-span-1 h-full flex flex-col p-8 md:p-16 bg-neutral-50 z-10 pt-32 overflow-y-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{project.title}</h2>
          <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">{project.category?.replace('_', ' ')}</div>

          {project.description && (
            <p className="text-neutral-600 leading-relaxed text-sm md:text-base mb-8 pb-8 border-b border-neutral-200">
              {project.description}
            </p>
          )}

          <div className="mb-12">
            <h3 className="text-[10px] uppercase tracking-widest text-neutral-400 mb-4">Node Parameters</h3>
            <pre className={`${robotoMono.className} text-[10px] bg-neutral-100 p-6 text-neutral-800 overflow-x-auto border border-neutral-200`}>
              {JSON.stringify(project.properties, null, 2)}
            </pre>
          </div>

          <div className="mt-auto pt-8 border-t border-neutral-200">
            <div className={`${robotoMono.className} text-xs text-neutral-400 uppercase tracking-widest flex justify-between`}>
              <span>View {currentImgIndex + 1} / {allImages.length}</span>
              <span>© {new Date().getFullYear()} Miguel Hezekiah</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ProjectPage() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center font-mono text-sm">Initializing framework...</div>}>
      <ProjectNode />
    </Suspense>
  );
}