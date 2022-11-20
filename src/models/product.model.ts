import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    prouduct_id: {
      type: String,
      unique: true
    },
    name: { type: String },
    price: { type: Number },
    size: { type: String },
    type: { type: String, nullable: true }
  },
  { timestamps: true }
)

export const productModel = mongoose.model('products', productSchema)
