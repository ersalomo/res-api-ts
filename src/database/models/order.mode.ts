import { Schema, model } from 'mongoose';
import OrderType from '../types/order.type';

const DOC_NAME = 'Order';
const COLLECT_NAME = 'orders';

const schema = new Schema<OrderType>({
  order_id: Schema.Types.String,
  user_id: Schema.Types.ObjectId,
  product_id: Schema.Types.ObjectId,
  status: Schema.Types.String
}, {
  timestamps: true
});

export const OrderModel = model<OrderType>(DOC_NAME, schema, COLLECT_NAME)
