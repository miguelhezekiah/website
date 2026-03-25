import pb from '../lib/pocketbase';
import LibraryGrid, { LibraryItem } from '../components/LibraryGrid';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch data securely on the server
  const records = await pb.collection('library_items').getFullList<LibraryItem>({
    sort: '-created',
    expand: 'tags',
  });

  return (
    <main className="min-h-screen bg-white">
      {/* Pass the fetched records down to the interactive client component */}
      <LibraryGrid items={records} />
    </main>
  );
}