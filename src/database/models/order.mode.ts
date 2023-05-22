import { Schema, model } from 'mongoose';
import OrderType, { StatusOrder } from '../types/order.type';

const DOC_NAME = 'Order';
const COLLECT_NAME = 'orders';

const schema = new Schema<OrderType>({
  user_id: Schema.Types.ObjectId,
  product_id: Schema.Types.ObjectId,
  status: {
    type: Schema.Types.String,
    enum: Object.values(StatusOrder),
  }
}, {
  timestamps: true
});

export const OrderModel = model<OrderType>(DOC_NAME, schema, COLLECT_NAME)
