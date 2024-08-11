import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

async function getRecentOrders(userId: string) {
  // TODO: Implement actual data fetching from your database
  return [
    { id: '1', date: new Date('2023-05-01'), total: 125.00, status: 'Delivered' },
    { id: '2', date: new Date('2023-05-15'), total: 75.50, status: 'Processing' },
  ];
}

export async function RecentOrders({ userId }: { userId: string }) {
  const orders = await getRecentOrders(userId);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date.toLocaleDateString()}</TableCell>
              <TableCell>${order.total.toFixed(2)}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                <Link href={`/dashboard/orders/${order.id}`}>
                  <Button variant="ghost">View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 text-right">
        <Link href="/dashboard/orders">
          <Button variant="outline">View All Orders</Button>
        </Link>
      </div>
    </div>
  );
}