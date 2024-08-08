import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { getAllProducts } from '@/app/lib/db-queries';

interface ProductListProps {
  searchTerm?: string;
  page?: number;
}

export async function ProductList({ searchTerm, page = 1 }: ProductListProps) {
  const { products, pagination } = await getAllProducts(undefined, searchTerm, page, 10);

  return (
    <div className="grid grid-cols-2 gap-4 px-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <Link href={`/mobile/products/${product.id}`}>
            <CardContent className="p-2">
              <div className="aspect-square relative mb-2">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover rounded-md"
                  loading="lazy"
                />
              </div>
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{product.brand}</p>
              <p className="font-bold text-sm mt-1">${product.price.toFixed(2)}</p>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}

export default ProductList;