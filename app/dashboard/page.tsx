import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Welcome to your Dashboard, {user?.given_name}!</h1>
      <p>Email: {user?.email}</p>
      {/* Add more dashboard content here */}
    </div>
  );
}