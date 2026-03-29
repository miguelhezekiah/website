import type { Metadata } from 'next';
import { Onest, Roboto_Mono } from 'next/font/google';
import GlobalHeader from '../components/GlobalHeader'; // Adjust path if necessary
import GlobalFooter from '../components/GlobalFooter'; // Adjust path if necessary
import './globals.css'; // Make sure this points to your Tailwind CSS file

const onest = Onest({ subsets: ['latin'], weight: ['300', '500', '700'], variable: '--font-onest' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['300', '500'], variable: '--font-roboto' });

export const metadata: Metadata = {
  title: 'Miguel Hezekiah | Designer',
  description: 'Algorithmic geometry, digital fabrication, and parametric web architectures.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">

      <body className={`${onest.className} `}>
        {/* THE GLOBAL MOUNT */}
        <GlobalHeader />

        {/* DYNAMIC PAGE CONTENT */}
        <main className="grow w-full">
          {children}
        </main>

        {/* PERSISTENT GLOBAL FOOTER */}
        <GlobalFooter />

      </body>
    </html>
  );
}