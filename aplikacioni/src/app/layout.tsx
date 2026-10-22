import { Inter } from 'next/font/google';
import './globals.css';
import Pwa from '@/components/Pwa';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'RideShare',
  description: 'RideShare demo app for Java 3',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sq">
      <body className={inter.className}><Pwa />{children}</body>
    </html>
  );
}
