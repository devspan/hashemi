import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pakistan Fragrance Community (PFC)',
  description: 'Discover exquisite fragrances from European Niche and Made by Pakistan collections.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto">
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/european-niche" className="hover:text-gray-300">European Niche</a></li>
              <li><a href="/mbp" className="hover:text-gray-300">Made by Pakistan</a></li>
              <li><a href="/login" className="hover:text-gray-300">Login</a></li>
              <li><a href="/signup" className="hover:text-gray-300">Sign Up</a></li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <div className="container mx-auto text-center">
            © 2024 Pakistan Fragrance Community. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}