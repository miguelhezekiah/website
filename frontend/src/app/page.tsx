import supabase from '../lib/supabase';
import SpatialGrid from '../components/SpatialGrid'; // Adjust this import path if needed

// Force Next.js to dynamically render this page so it always shows fresh database items
export const revalidate = 0;

export default async function Home() {
  // 1. Fetch data securely on the server using Supabase syntax
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

  // 2. Translate the PostgreSQL data into the shape your UI expects
  const mappedItems = (data || []).map((item: any) => ({
    id: item.id,
    collectionId: 'supabase-node', // Dummy string to satisfy the old interface
    title: item.title,
    category: item.category,
    cover_image: item.cover_image, // This is now a full, ready-to-use URL string
    properties: item.properties,
    expand: {
      tags: item.tags || []
    }
  }));

  return (
    <main>
      <SpatialGrid items={mappedItems} />
    </main>
  );
}