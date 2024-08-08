import dbConnect from './db';
import Product from '@/app/models/Product';
import { Types, Document } from 'mongoose';

interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  // Add other fields as necessary
}

interface ProductOutput {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  category: string;
  description?: string;
}

function formatProduct(product: IProduct): ProductOutput {
  return {
    id: product._id.toString(),
    name: product.name,
    brand: product.brand,
    price: product.price,
    imageUrl: product.imageUrl || '/placeholder.png',
    category: product.category,
    description: product.description
  };
}

export async function getFeaturedProducts(limit = 3): Promise<ProductOutput[]> {
  await dbConnect();
  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean() as IProduct[];

  return products.map(formatProduct);
}

export async function getAllProducts(
  category?: string,
  searchTerm?: string,
  page = 1,
  limit = 10
): Promise<{
  products: ProductOutput[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  };
}> {
  await dbConnect();
  const query: any = {};
  
  if (category) {
    query.category = category;
  }

  if (searchTerm) {
    query.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { brand: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } }
    ];
  }

  const totalProducts = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / limit);

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean() as IProduct[];

  return {
    products: products.map(formatProduct),
    pagination: {
      currentPage: page,
      totalPages,
      totalProducts
    }
  };
}