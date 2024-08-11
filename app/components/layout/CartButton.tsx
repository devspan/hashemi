// app/components/layout/CartButton.tsx
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/contexts/CartContext';

export function CartButton() {
  const { items } = useCart();

  return (
    <Link href="/cart" aria-label="Shopping cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="w-5 h-5" />
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {items.length}
          </span>
        )}
      </Button>
    </Link>
  );
}