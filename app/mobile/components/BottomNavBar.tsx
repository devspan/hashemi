'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingBag, User } from 'lucide-react';

const navItems = [
  { href: '/mobile', icon: Home, label: 'Home' },
  { href: '/mobile/products', icon: Search, label: 'Products' },
  { href: '/mobile/cart', icon: ShoppingBag, label: 'Cart' },
  { href: '/mobile/profile', icon: User, label: 'Profile' },
];

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <ul className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 ${
                pathname === item.href ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}