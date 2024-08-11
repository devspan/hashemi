import { ReactNode } from 'react';
import Link from 'next/link';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect('/api/auth/login');
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card text-card-foreground p-4">
        <div className="flex items-center space-x-4 mb-6">
          <Avatar>
            <AvatarImage src={user.picture || ''} alt={user.given_name || 'User'} />
            <AvatarFallback>{user.given_name?.[0] || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user.given_name} {user.family_name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <nav className="space-y-2">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
          </Link>
          <Link href="/dashboard/orders">
            <Button variant="ghost" className="w-full justify-start">Orders</Button>
          </Link>
          <Link href="/dashboard/favorites">
            <Button variant="ghost" className="w-full justify-start">Favorites</Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button variant="ghost" className="w-full justify-start">Settings</Button>
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}