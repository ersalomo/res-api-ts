import mongoose from 'mongoose';
import ProductType from '../../types/products.types';

const PRODUCT_DOC = 'products'

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      unique: true
    },
    name: { type: String },
    price: { type: Number },
    size: { type: String },
    type: { type: String }
  },
  { timestamps: true }
)

export const productModel = mongoose.model<ProductType>(PRODUCT_DOC, productSchema)
