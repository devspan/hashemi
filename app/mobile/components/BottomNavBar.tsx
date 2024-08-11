'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, User, Heart, Menu } from 'lucide-react';
import { cn } from "@/lib/utils";

const navItems = [
  { href: '/mobile', icon: Home, label: 'Home' },
  { href: '/mobile/favorites', icon: Heart, label: 'Favorites' },
  { href: '/mobile/cart', icon: ShoppingBag, label: 'Cart' },
  { href: '/mobile/profile', icon: User, label: 'Profile' },
  { href: '/mobile/menu', icon: Menu, label: 'More' },
];

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <ul className="flex justify-around items-center h-16 max-w-screen-xl mx-auto">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link 
              href={item.href}
              className={cn(
                "bottom-nav-item",
                pathname === item.href && "bottom-nav-item-active"
              )}
            >
              <item.icon className="bottom-nav-icon" />
              <span className="bottom-nav-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}