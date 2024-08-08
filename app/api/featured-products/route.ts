import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import { getFeaturedProducts } from '@/app/lib/db-queries';

export async function GET() {
  try {
    await dbConnect();
    const featuredProducts = await getFeaturedProducts(3);
    return NextResponse.json(featuredProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}