import { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { BottomNavBar } from './components/BottomNavBar';

export const metadata: Metadata = {
  title: 'PFC Mobile',
  description: 'Mobile version of Pakistan Fragrance Community (PFC)',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function MobileLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-grow pb-16">
        {children}
      </main>
      <BottomNavBar />
    </div>
  );
}