import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import Product from '@/app/models/Product';
import { validateToken } from '@/app/utils/auth';

export async function POST(req: NextRequest) {
  try {
    const user = validateToken(req);
    if (!user || user.role !== 'seller') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { name, description, price, category, brand, stock } = await req.json();

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      brand,
      stock,
      seller: user.userId,
    });

    await newProduct.save();

    return NextResponse.json({ message: 'Product created successfully', product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}