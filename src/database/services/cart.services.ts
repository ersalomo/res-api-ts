/* eslint-disable camelcase */
import { Types } from 'mongoose';
import { CartModel } from '../models/cart.model';
import CartType from '../types/cart.type';

type Cart = CartType & {
  _id: Types.ObjectId
}

export default class CartServices {
  private _model = CartModel

  public async index() {
    return this._model.find()
  }

  public async userCarts(userId: Types.ObjectId) {
    return this._model.find({ user_id: userId })
  }

  public async addToCart(payload: CartType) {
    const { user_id, product_id } = payload;
    const cart = await this.cartExists(user_id, product_id);
    if (cart) {
      return await this.addCountProduct(cart._id, 1)
    }
    return await this._model.create(payload)
  }

  private async cartExists(userId:string, productId:string):
  Promise<Cart | null> {
    return this._model.findOne({ user_id: userId, product_id: productId })
  }

  public async removeFromCart(id: string) {
    return await this._model.deleteOne({ _id: id })
  }

  async addCountProduct(id:Types.ObjectId, count:number) {
    return await this._model.updateOne({ _id: id }, { $inc: { count } })
  }

  async veryfyCartUser(idCart:string, userId: string) {
    return this._model.findOne({ _id: idCart, user_id: userId })
  }
}
