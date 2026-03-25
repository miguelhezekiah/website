import type { Metadata } from "next";
import "./globals.css";
import { Onest, Roboto_Mono } from 'next/font/google';

const onest = Onest({ subsets: ['latin'], weight: ['100', '300', '500', '700'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${onest.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
