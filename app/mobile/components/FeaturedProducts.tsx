'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart } from 'lucide-react';

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

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <section className="mb-6">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link href="/mobile/featured" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4 px-4">
          {isLoading
            ? Array(5).fill(0).map((_, index) => (
                <Card key={index} className="w-[200px] flex-shrink-0">
                  <CardContent className="p-4">
                    <Skeleton className="w-full h-[200px] rounded-lg mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                  </CardContent>
                </Card>
              ))
            : featuredProducts.map((product) => (
                <Card key={product.id} className="w-[200px] flex-shrink-0 group">
                  <Link href={`/mobile/products/${product.id}`}>
                    <CardContent className="p-4 relative">
                      <div className="relative mb-2 overflow-hidden rounded-lg">
                        <Image 
                          src={product.imageUrl} 
                          alt={product.name} 
                          width={200} 
                          height={200} 
                          className="object-cover w-full h-[200px] transition-transform duration-300 group-hover:scale-105" 
                        />
                        <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      <h3 className="font-semibold truncate">{product.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">{product.brand}</p>
                      <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
                    </CardContent>
                  </Link>
                </Card>
              ))
          }
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}