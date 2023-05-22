import { OrderModel } from '../models/order.mode';
import OrderType, { StatusOrder } from '../types/order.type';

export default class OrderService {
  private _model = OrderModel

  async createOrder(payload: OrderType) {
    return this._model.create(payload)
  }

  async updateStatusOrder(id: string, status:StatusOrder) {
    return this._model.updateOne({ order_id: id }, { status })
  }
}
