// app/admin/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';

const AdminPage: FC = () => {
  return (
    <div>
      <Head>
        <title>Admin Page</title>
        <meta name="description" content="Admin page placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px' }}>
        <h1>Admin Dashboard</h1>
        
        <div className="flex flex-col gap-5 mt-5">
          <Skeleton className="h-12 w-3/5" />
          <Skeleton className="h-36 w-full" />
          <Skeleton className="h-36 w-full" />
        </div>

        <p className="mt-5">This is a placeholder for the admin page content.</p>
      </main>
    </div>
  );
};

export default AdminPage;
