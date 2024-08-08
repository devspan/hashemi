import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { SearchBar } from '../components/SearchBar';
import ProductList from '../components/ProductList';

export const metadata = {
  title: 'PFC Mobile - Products',
  description: 'Browse our collection of fragrances on Pakistan Fragrance Community.',
};

export default function ProductsPage({
  searchParams
}: {
  searchParams: { q?: string }
}) {
  const searchTerm = searchParams.q || '';

  return (
    <div className="space-y-4">
      <SearchBar />
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList searchTerm={searchTerm} />
      </Suspense>
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-48 w-full" />
      ))}
    </div>
  );
}