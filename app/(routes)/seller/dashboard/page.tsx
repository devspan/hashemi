// app/dashboard/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';

const DashboardPage: FC = () => {
  return (
    <div>
      <Head>
        <title>Dashboard Page</title>
        <meta name="description" content="Dashboard page placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px' }}>
        <h1>Dashboard</h1>

        <div className="flex flex-col gap-6 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>

          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>

        <p className="mt-6">This is a placeholder for the dashboard page content.</p>
      </main>
    </div>
  );
};

export default DashboardPage;
