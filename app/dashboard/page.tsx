import { Suspense } from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentOrders } from './RecentOrders';
import { FavoriteProducts } from './FavoriteProducts';
import { AccountOverview } from './AccountOverview';

export const metadata = {
  title: 'Dashboard | Pakistan Fragrance Community',
  description: 'View your account overview, recent orders, and favorite products.',
};

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null; // This should be handled by the layout, but adding as a safeguard
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {user.given_name}!</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading account overview...</div>}>
              <AccountOverview userId={user.id} />
            </Suspense>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Loading recent orders...</div>}>
              <RecentOrders userId={user.id} />
            </Suspense>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Favorite Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading favorite products...</div>}>
            <FavoriteProducts userId={user.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}