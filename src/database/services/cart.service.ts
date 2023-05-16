import { CartModel } from '../models/cart.model';
import CartType from '../../types/cart.type';

export const CartService = {
  async addToCart(payload: CartType) {
    return await CartModel.create(payload)
  },

  async removeFromCart(id: string) {
    return await CartModel.deleteOne({ cart_id: id })
  },

  async addCountProduct(id:string, count:number) {
    return await CartModel.updateOne({ cart_id: id }, { $inc: { count } })
  }
}
