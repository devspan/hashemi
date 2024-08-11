import { Card, CardContent } from "@/components/ui/card";

async function getUserData(userId: string) {
  // TODO: Implement actual data fetching from your database
  return {
    totalOrders: 5,
    totalSpent: 250.00,
    memberSince: new Date('2023-01-01'),
  };
}

export async function AccountOverview({ userId }: { userId: string }) {
  const userData = await getUserData(userId);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{userData.totalOrders}</div>
          <p className="text-muted-foreground">Total Orders</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">${userData.totalSpent.toFixed(2)}</div>
          <p className="text-muted-foreground">Total Spent</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="text-2xl font-bold">{userData.memberSince.toLocaleDateString()}</div>
          <p className="text-muted-foreground">Member Since</p>
        </CardContent>
      </Card>
    </div>
  );
}