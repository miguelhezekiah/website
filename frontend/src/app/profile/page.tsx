import Link from 'next/link';
import { Onest, Roboto_Mono } from 'next/font/google';

const onest = Onest({ subsets: ['latin'], weight: ['300', '500', '700'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['300', '500'] });
  
export default function Profile() {
  return (
    <main className={`min-h-screen bg-neutral-50 text-black p-8 md:p-16 ${onest.className}`}>
      <nav className="max-w-3xl mx-auto mb-16 flex justify-between items-center border-neutral-200 pb-4">
        <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:text-neutral-500 transition-colors">
          ← Return to Grid
        </Link>
      </nav>

      <article className="max-w-3xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Miguel Hezekiah</h1>
          <p className="text-xl text-neutral-600 leading-relaxed">
            I am a computational designer and developer, specializing in algorithmic geometry, digital fabrication, and parametric web architectures.
          </p>
        </header>

        <section className="mb-12">
          <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">Curriculum Vitae</h2>
          <div className="flex flex-col gap-8">
            {/* CV Item 1 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-l-2 border-black pl-4">
              <div className={`${robotoMono.className} text-sm text-neutral-500`}>2024 — Present</div>
              <div className="md:col-span-3">
                <h3 className="font-bold text-lg">Computational Designer</h3>
                <p className="text-neutral-600 mt-2">Developing algorithmic spatial systems and bridging the gap between parametric modeling and web-based deployment architectures.</p>
              </div>
            </div>
            
            {/* Add more CV items here following the same structure */}
          </div>
        </section>
      </article>
    </main>
  );
}
