// app/sellers-products/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';

const SellersProductsPage: FC = () => {
  return (
    <div>
      <Head>
        <title>Sellers Products Page</title>
        <meta name="description" content="Sellers products page placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px' }}>
        <h1>Sellers Products</h1>

        <div className="flex flex-col gap-6 mt-6">
          <Skeleton className="h-12 w-full" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>

        <p className="mt-6">This is a placeholder for the sellers products page content.</p>
      </main>
    </div>
  );
};

export default SellersProductsPage;
