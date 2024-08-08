// app/seller-orders/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';

const SellerOrdersPage: FC = () => {
  return (
    <div>
      <Head>
        <title>Seller Orders Page</title>
        <meta name="description" content="Seller orders page placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px' }}>
        <h1>Seller Orders</h1>

        <div className="flex flex-col gap-6 mt-6">
          <Skeleton className="h-12 w-full" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>

        <p className="mt-6">This is a placeholder for the seller orders page content.</p>
      </main>
    </div>
  );
};

export default SellerOrdersPage;
