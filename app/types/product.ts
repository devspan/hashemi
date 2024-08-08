export interface Product {
    _id: string;
    name: string;
    brand: string;
    description: string;
    price: number;
    category: 'European Niche' | 'Made by Pakistan';
    imageUrl: string;
  }