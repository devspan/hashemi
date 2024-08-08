'use client';

import { SearchBar } from './SearchBar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProducts = dynamic<any>(() => import('./FeaturedProducts').then((mod) => mod.FeaturedProducts), {
  loading: () => <Skeleton className="h-48 w-full" />,
  ssr: true
});

const ProductList = dynamic<any>(() => import('./ProductList').then((mod) => mod.ProductList), {
  loading: () => <ProductListSkeleton />,
  ssr: true
});

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-48 w-full" />
      ))}
    </div>
  );
}

type ProductListProps = {
  searchTerm: string;
};

type MobileHomeWrapperProps = {
  initialSearchTerm?: string;
};

export function MobileHomeWrapper({ initialSearchTerm = '' }: MobileHomeWrapperProps) {
  return (
    <div className="space-y-4">
      <SearchBar />
      <Suspense fallback={<ProductListSkeleton />}>
        {initialSearchTerm ? (
          <ProductList searchTerm={initialSearchTerm} />
        ) : (
          <>
            <FeaturedProducts />
            <ProductList searchTerm="" />
          </>
        )}
      </Suspense>
    </div>
  );
}