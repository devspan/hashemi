import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db';
import Product from '@/app/models/Product';

const perfumes = [
  {
    name: "Aventus",
    brand: "Creed",
    description: "Fruity and rich, Aventus is a sophisticated blend for the modern man.",
    price: 325,
    category: "European Niche",
    stock: 50,
    fragrance_notes: ["Pineapple", "Birch", "Musk", "Oakmoss"],
    year_released: 2010,
    gender: "Masculine",
    imageUrl: "https://demo.pakfrag.com/images/aventus.jpg"
  },
  {
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    description: "A luxurious and complex scent with an amber woody aura.",
    price: 300,
    category: "European Niche",
    stock: 40,
    fragrance_notes: ["Saffron", "Jasmine", "Amberwood", "Fir Resin"],
    year_released: 2015,
    gender: "Unisex",
    imageUrl: "https://demo.pakfrag.com/images/baccarat-rouge-540.jpg"
  },
  {
    name: "Khas",
    brand: "Junaid Jamshed",
    description: "A traditional Pakistani fragrance with a modern twist.",
    price: 50,
    category: "Made by Pakistan",
    stock: 100,
    fragrance_notes: ["Sandalwood", "Patchouli", "Vetiver", "Musk"],
    year_released: 2018,
    gender: "Masculine",
    imageUrl: "https://demo.pakfrag.com/images/khas.jpg"
  },
  {
    name: "Noor",
    brand: "Al-Rehab",
    description: "A delightful floral fragrance inspired by Pakistani gardens.",
    price: 40,
    category: "Made by Pakistan",
    stock: 80,
    fragrance_notes: ["Rose", "Jasmine", "Amber", "Vanilla"],
    year_released: 2019,
    gender: "Feminine",
    imageUrl: "https://demo.pakfrag.com/images/noor.jpg"
  }
];

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'This route is not available in production' }, { status: 403 });
  }

  try {
    console.log('Attempting to connect to database...');
    await dbConnect();
    console.log('Connected to MongoDB');

    console.log('Clearing existing products...');
    await Product.deleteMany({});
    console.log('Cleared existing products');

    console.log('Inserting new products...');
    const insertedProducts = await Product.insertMany(perfumes);
    console.log(`Inserted ${insertedProducts.length} products`);

    return NextResponse.json({ 
      message: 'Demo data initialized successfully', 
      count: insertedProducts.length 
    }, { status: 200 });
  } catch (error) {
    console.error('Error initializing demo data:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ 
      error: 'Failed to initialize demo data', 
      details: error instanceof Error ? error.message : String(error) 
    }, { status: 500 });
  }
}