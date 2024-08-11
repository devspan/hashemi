import { Suspense } from 'react';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const metadata = {
  title: 'Orders | Dashboard | Pakistan Fragrance Community',
  description: 'View your order history and track your purchases.',
};

async function getOrders(userId: string) {
  // TODO: Implement actual data fetching from your database
  return [
    { id: '1', date: new Date('2023-05-01'), total: 125.00, status: 'Delivered' },
    { id: '2', date: new Date('2023-05-15'), total: 75.50, status: 'Processing' },
    { id: '3', date: new Date('2023-06-01'), total: 200.00, status: 'Shipped' },
  ];
}

async function OrdersTable({ userId }: { userId: string }) {
  const orders = await getOrders(userId);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.date.toLocaleDateString()}</TableCell>
            <TableCell>${order.total.toFixed(2)}</TableCell>
            <TableCell>{order.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default async function OrdersPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null; // This should be handled by the layout, but adding as a safeguard
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Orders</h1>
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading orders...</div>}>
            <OrdersTable userId={user.id} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}