import { OrderModel } from '../models/order.mode';
import OrderType, { StatusOrder } from '../../types/order.type';

const OrderService = {
  async createOrder(payload: OrderType) {
    return OrderModel.create(payload)
  },
  async updateStatusOrder(id: string, status:StatusOrder) {
    return OrderModel.updateOne({ order_id: id }, { status })
  }

}

export default OrderService
