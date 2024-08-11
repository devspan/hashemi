import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from './components/ThemeProvider';
import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './contexts/CartContext';

const roboto = Roboto({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'Pakistan Fragrance Community (PFC)',
  description: 'Discover exquisite fragrances from European Niche and Made by Pakistan collections.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}