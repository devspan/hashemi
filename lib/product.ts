import dbConnect from '@/app/lib/db';
import Product from '@/app/models/Product';

export async function getProductById(id: string) {
  await dbConnect();
  
  try {
    const product = await Product.findById(id).lean();
    if (!product) return null;
    
    return {
      id: product._id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      brand: product.brand,
      imageUrl: product.imageUrl,
    };
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}