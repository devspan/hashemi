import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById } from '@/lib/product';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image 
            src={product.imageUrl || '/placeholder.png'} 
            alt={product.name} 
            width={500} 
            height={500} 
            className="rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">Brand: {product.brand}</p>
          <p className="mb-4">Category: {product.category}</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}