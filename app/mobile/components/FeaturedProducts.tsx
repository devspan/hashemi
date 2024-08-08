import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { getFeaturedProducts } from '@/app/lib/db-queries';

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts(3);

  return (
    <section className="mb-6">
      <h2 className="text-2xl font-bold mb-4 px-4">Featured Products</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 pb-4 px-4">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="w-[250px] flex-shrink-0">
              <CardContent className="p-4">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  width={200} 
                  height={200} 
                  className="rounded-lg mb-2 object-cover w-full h-[200px]" 
                />
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-sm text-muted-foreground truncate">{product.brand}</p>
                <p className="font-bold mt-1">${product.price.toFixed(2)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}

export default FeaturedProducts;