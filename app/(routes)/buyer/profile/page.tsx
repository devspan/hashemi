// app/profile/page.tsx
import { FC } from 'react';
import Head from 'next/head';
import { Skeleton } from '@/components/ui/skeleton';

const ProfilePage: FC = () => {
  return (
    <div>
      <Head>
        <title>Profile Page</title>
        <meta name="description" content="Profile page placeholder" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ padding: '20px' }}>
        <h1>Profile</h1>

        <div className="flex flex-col gap-6 mt-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>

        <p className="mt-6">This is a placeholder for the profile page content.</p>
      </main>
    </div>
  );
};

export default ProfilePage;
