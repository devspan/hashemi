import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  brand: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  fragrance_notes: string[];
  year_released: number;
  gender: 'Masculine' | 'Feminine' | 'Unisex';
  imageUrl?: string;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  fragrance_notes: { type: [String], required: true },
  year_released: { type: Number, required: true },
  gender: { type: String, enum: ['Masculine', 'Feminine', 'Unisex'], required: true },
  imageUrl: { type: String }
}, { timestamps: true });

// Check if the model already exists to prevent re-compilation errors
let Product: Model<IProduct>;

if (mongoose.models.Product) {
  Product = mongoose.models.Product as Model<IProduct>;
} else {
  Product = mongoose.model<IProduct>('Product', productSchema);
}

export default Product;