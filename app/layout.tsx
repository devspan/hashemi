import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';


const inter = Roboto({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'Pakistan Fragrance Community (PFC)',
  description: 'Discover exquisite fragrances from European Niche and Made by Pakistan collections.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow container mx-auto p-4">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}