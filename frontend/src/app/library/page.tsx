'use client';

import { useEffect, useState } from 'react';
import supabase from '../../lib/supabase';
import SpatialGrid from '../../components/LibraryContent';

export default function Library() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLibrary() {
      // 1. Fetch live data from Supabase directly from the browser
      const { data, error } = await supabase
        .from('library_items')
        .select(`
          *,
          tags ( id, name )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Failed to fetch from Supabase:', error);
      }

      // 2. Map the data for the Spatial Grid
      const mappedItems = (data || []).map((item: any) => ({
        id: item.id,
        collectionId: 'supabase-node',
        title: item.title,
        category: item.category,
        cover_image: item.cover_image,
        properties: item.properties,
        expand: {
          tags: item.tags || []
        }
      }));

      setItems(mappedItems);
      setLoading(false);
    }

    fetchLibrary();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      {loading ? (
        <div className="flex h-screen w-full items-center justify-center font-mono text-sm uppercase tracking-widest text-black">
          Arranging Library...
        </div>
      ) : (
        <SpatialGrid items={items} />
      )}
    </main>
  );
}