import mongoose from 'mongoose';
import CartType from '../types/cart.type';

const CART_DOC = 'Cart';
const COLECTION_NAME = 'carts';
// const { String, ObjectId } = mongoose.Schema.Types

export const CartSchema = new mongoose.Schema<CartType>({
  cart_id: {
    type: String,
    unique: true,
  },
  user_id: {
    type: String,
  },
  product_id: {
    type: String,
  }
}, {
  timestamps: true,
});

export const CartModel = mongoose.model<CartType>(CART_DOC, CartSchema, COLECTION_NAME);
