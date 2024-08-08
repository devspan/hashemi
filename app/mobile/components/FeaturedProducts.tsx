'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('/api/featured-products');
        if (!response.ok) {
          throw new Error('Failed to fetch featured products');
        }
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        setError('Error loading featured products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  if (isLoading) return <div>Loading featured products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-bold mb-4 px-4">Featured Products</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4 px-4">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="w-[250px] flex-shrink-0">
              <CardContent className="p-4">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  width={200} 
                  height={200} 
                  className="rounded-lg mb-2 object-cover w-full h-[200px]" 
                />
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{product.brand}</p>
                <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}