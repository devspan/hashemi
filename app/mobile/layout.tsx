import { ReactNode } from 'react';
import { BottomNavBar } from './components/BottomNavBar';

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