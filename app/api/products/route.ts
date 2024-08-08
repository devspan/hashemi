import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import Product from '@/app/models/Product';
import { validateToken } from '@/app/utils/auth';
import { SortOrder } from 'mongoose';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sort = searchParams.get('sort') || 'createdAt';
    const order = (searchParams.get('order') || 'desc') as SortOrder;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';

    const query: any = {};

    if (category) query.category = category;
    if (brand) query.brand = { $regex: brand, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const totalProducts = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const sortOption: { [key: string]: SortOrder } = { [sort]: order };

    const products = await Product.find(query)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      products,
      currentPage: page,
      totalPages,
      totalProducts,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = validateToken(req);
    if (!user || user.role !== 'seller') {
      return NextResponse.json({ error: 'You are not authorized to create products' }, { status: 403 });
    }

    await dbConnect();
    const productData = await req.json();

    const newProduct = new Product({
      ...productData,
      seller: user.userId,
    });

    await newProduct.save();

    return NextResponse.json({ message: 'Product created successfully', product: newProduct }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const user = validateToken(req);
    if (!user || user.role !== 'seller') {
      return NextResponse.json({ error: 'You are not authorized to update products' }, { status: 403 });
    }

    await dbConnect();
    const { id, ...updateData } = await req.json();

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, seller: user.userId },
      updateData,
      { new: true }
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: 'Product not found or you are not authorized to update it' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = validateToken(req);
    if (!user || user.role !== 'seller') {
      return NextResponse.json({ error: 'You are not authorized to delete products' }, { status: 403 });
    }

    await dbConnect();
    const { id } = await req.json();

    const deletedProduct = await Product.findOneAndDelete({ _id: id, seller: user.userId });

    if (!deletedProduct) {
      return NextResponse.json({ error: 'Product not found or you are not authorized to delete it' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}