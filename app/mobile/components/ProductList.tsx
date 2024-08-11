'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Heart } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

interface ProductListProps {
  searchTerm?: string;
  initialPage?: number;
}

export function ProductList({ searchTerm, initialPage = 1 }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products?search=${searchTerm || ''}&page=${page}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(prev => [...prev, ...data.products]);
      setHasMore(data.products.length > 0);
      setPage(prev => prev + 1);
    } catch (err) {
      setError('Error loading products');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    setProducts([]);
    setPage(initialPage);
    setHasMore(true);
  }, [searchTerm, initialPage]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchProducts();
    }
  }, [inView, hasMore, fetchProducts]);

  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <Link href={`/mobile/products/${product.id}`}>
            <CardContent className="p-2 relative">
              <div className="aspect-square relative mb-2 overflow-hidden rounded-md">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <button className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
              <p className="font-bold text-sm mt-1">${product.price.toFixed(2)}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
      {isLoading && (
        <>
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-2">
                <Skeleton className="aspect-square w-full mb-2 rounded-md" />
                <Skeleton className="h-4 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2 mb-1" />
                <Skeleton className="h-4 w-1/4" />
              </CardContent>
            </Card>
          ))}
        </>
      )}
      <div ref={ref} className="col-span-full h-1" />
    </div>
  );
}