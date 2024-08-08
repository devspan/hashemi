'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
}

interface ProductListProps {
  searchTerm?: string;
  page?: number;
}

export function ProductList({ searchTerm, page = 1 }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(`/api/products?search=${searchTerm || ''}&page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError('Error loading products');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [searchTerm, page]);

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <Link href={`/mobile/products/${product.id}`}>
            <CardContent className="p-2">
              <div className="aspect-square relative mb-2">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-md"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
              <p className="font-bold text-sm mt-1">${product.price.toFixed(2)}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}