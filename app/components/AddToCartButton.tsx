'use client';

import { useState } from 'react';
import { useCart } from '@/app/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Product } from '@/app/lib/products';

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imageUrl || '/placeholder.png',
    });
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Button onClick={handleAddToCart} disabled={isAdding}>
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </Button>
  );
}