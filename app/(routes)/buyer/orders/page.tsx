// app/orders/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';

const OrdersPage: FC = () => {
  return (
    <div>
      <Head>
        <title>Orders Page</title>
        <meta name="description" content="Orders page placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px' }}>
        <h1>Your Orders</h1>

        <div className="flex flex-col gap-5 mt-5">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>

        <p className="mt-5">This is a placeholder for the orders page content.</p>
      </main>
    </div>
  );
};

export default OrdersPage;
