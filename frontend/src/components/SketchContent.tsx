import Link from 'next/link';
import { Roboto_Mono } from 'next/font/google';

const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['300', '500'] });

// We add a basePath prop so the grid knows if it should route to /project or /sketch
export default function SketchSlide({ items, basePath = '/project' }: { items: any[], basePath?: string }) {
  if (!items || items.length === 0) {
    return <div className="text-sm font-mono text-neutral-400 uppercase tracking-widest p-8 pt-32">No nodes found.</div>;
  }

  return (
    // Removed all max-width and padding. It is now completely fluid.
    <div className="w-full flex flex-col">
      {items.map((item) => (
        <Link 
          key={item.id} 
          href={`${basePath}?id=${item.id}`} 
          // min-h-screen ensures the border perfectly hits the bottom of your monitor
          className="grid grid-cols-1 md:grid-cols-3 w-full min-h-screen border-b border-neutral-200 last:border-b-0 group cursor-pointer"
        >
          {/* IMAGE COLUMN (2/3 Viewport Width) */}
          {/* Added padding here so the image itself breathes, but the container touches the edge */}
          <div className="md:col-span-2 relative w-full h-full flex items-center justify-center p-8 md:p-16">
            <img
              src={item.cover_image}
              alt={item.title}
              className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            />
          </div>

          {/* LABEL COLUMN (1/3 Viewport Width) */}
          <div className="md:col-span-1 flex flex-col justify-center p-8 md:p-16 bg-neutral-50/50">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 group-hover:text-neutral-500 transition-colors">
              {item.title}
            </h2>
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8">
              {item.category.replace('_', ' ')}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              {item.expand?.tags?.map((tag: any, idx: number) => (
                <span key={idx} className="px-2 py-1 text-[10px] uppercase tracking-wider border border-neutral-200 text-neutral-500">
                  {tag.name || tag}
                </span>
              ))}
            </div>

            <span className={`${robotoMono.className} text-[10px] uppercase tracking-widest text-neutral-400`}>
              Click to enter node →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}