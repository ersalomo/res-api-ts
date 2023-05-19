import { CartModel } from '../models/cart.model';
import CartType from '../types/cart.type';

export default class CartService {
  private _model = CartModel

  public async index() {
    return await this._model.find()
  }

  public async addToCart(payload: CartType) {
    return await this._model.create(payload)
  }

  public async removeFromCart(id: string) {
    return await this._model.deleteOne({ cart_id: id })
  }

  async addCountProduct(id:string, count:number) {
    return await this._model.updateOne({ cart_id: id }, { $inc: { count } })
  }
}
