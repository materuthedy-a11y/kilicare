import type { Metadata } from 'next';
import { DM_Sans, Outfit, Sora } from 'next/font/google';
import './globals.css';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-dm-sans', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  title: 'Kilicare Adventure · Tanzania, closer than ever',
  description: 'Climb Kilimanjaro, explore the Serengeti and slow down in Zanzibar with a local Tanzania team.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${dmSans.variable} ${sora.variable} ${outfit.variable}`}><body>{children}</body></html>;
}
