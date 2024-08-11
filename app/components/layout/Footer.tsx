import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-8 border-t hidden md:block">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">Pakistan Fragrance Community is dedicated to exploring and sharing the rich world of fragrances.</p>
          </div>

          {/* Quick Links section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/products" className="text-sm hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/blog" className="text-sm hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/about" className="text-sm hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Legal section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy-policy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-conditions" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/shipping-policy" className="text-sm hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="text-sm hover:text-primary transition-colors">Return Policy</Link></li>
            </ul>
          </div>

          {/* Contact section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2" />
                <a href="mailto:info@pakfrag.com" className="text-sm hover:text-primary transition-colors">info@pakfragrance.com</a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2" />
                <a href="tel:+923001234567" className="text-sm hover:text-primary transition-colors">+92 300 123 4567</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media and Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            © 2024 Pakistan Fragrance Community. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Youtube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}