import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";

async function getFavoriteProducts(userId: string) {
  // TODO: Implement actual data fetching from your database
  return [
    { id: '1', name: 'Aventus', brand: 'Creed', price: 325.00, imageUrl: '/images/aventus.jpg' },
    { id: '2', name: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', price: 300.00, imageUrl: '/images/baccarat-rouge.jpg' },
  ];
}

export async function FavoriteProducts({ userId }: { userId: string }) {
  const products = await getFavoriteProducts(userId);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <p className="font-bold mt-2">${product.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}