// File: app/models/Product.ts

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true, enum: ['European Niche', 'Made by Pakistan'] },
  stock: { type: Number, required: true },
  fragrance_notes: [{ type: String }],
  year_released: { type: Number },
  gender: { type: String, enum: ['Masculine', 'Feminine', 'Unisex'] },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;