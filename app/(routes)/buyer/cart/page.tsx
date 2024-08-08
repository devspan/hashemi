// app/cart/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';

const CartPage: FC = () => {
  return (
    <div>
      <Head>
        <title>Cart Page</title>
        <meta name="description" content="Cart page placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px' }}>
        <h1>Your Shopping Cart</h1>

        <div className="flex flex-col gap-5 mt-5">
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>

        <p className="mt-5">This is a placeholder for the cart page content.</p>
      </main>
    </div>
  );
};

export default CartPage;
