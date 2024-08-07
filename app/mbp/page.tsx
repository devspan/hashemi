'use client';

import React, { useState } from 'react';
import { useProducts } from '@/app/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

export default function MBPPage() {
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    sort: 'createdAt',
    order: 'desc' as 'asc' | 'desc',
  });

  const { products, loading, error, loadMore, hasMore } = useProducts({
    category: 'Made by Pakistan', // or 'European Niche' for the other file
    ...filters,
    minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
    maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-4">PFC Made by Pakistan (MBP) Collection</h1>
      <p className="text-lg mb-8">Discover unique fragrances created by talented Pakistani perfumers.</p>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap gap-4">
        <Input
          type="text"
          name="brand"
          placeholder="Filter by brand"
          onChange={handleFilterChange}
        />
        <Input
          type="number"
          name="minPrice"
          placeholder="Min price"
          onChange={handleFilterChange}
        />
        <Input
          type="number"
          name="maxPrice"
          placeholder="Max price"
          onChange={handleFilterChange}
        />
        <Select name="sort" onValueChange={(value) => handleFilterChange({ target: { name: 'sort', value } } as any)} defaultValue="createdAt">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Latest</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectContent>
        </Select>
        <Select name="order" onValueChange={(value) => handleFilterChange({ target: { name: 'order', value } } as any)} defaultValue="desc">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Descending</SelectItem>
            <SelectItem value="asc">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product listing */}
      {loading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-4/5" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-8 w-1/2" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {products.map(product => (
            <Card key={product._id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{product.description}</p>
                <p className="font-bold mt-2">Price: ${product.price.toFixed(2)}</p>
                <p>Brand: {product.brand}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/products/${product._id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="mt-8 text-center">
          <Button onClick={loadMore} variant="secondary">Load More</Button>
        </div>
      )}
    </div>
  );
}