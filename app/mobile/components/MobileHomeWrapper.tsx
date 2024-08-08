'use client';

import { SearchBar } from './SearchBar';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const FeaturedProducts = dynamic(() => import('./FeaturedProducts'), {
  loading: () => <Skeleton className="h-48 w-full" />,
  ssr: true
});

const ProductList = dynamic(() => import('./ProductList'), {
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

export function MobileHomeWrapper({ initialSearchTerm = '' }) {
  return (
    <div className="space-y-4">
      <SearchBar />
      <Suspense fallback={<ProductListSkeleton />}>
        {initialSearchTerm ? (
          <ProductList searchTerm={initialSearchTerm} />
        ) : (
          <>
            <FeaturedProducts />
            <ProductList />
          </>
        )}
      </Suspense>
    </div>
  );
}