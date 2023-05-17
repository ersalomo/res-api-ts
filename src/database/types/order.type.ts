/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Document } from 'mongoose';

export enum StatusOrder {
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

export default interface OrderType extends Document {
  order_id: string,
  user_id: string,
  product_id: string,
  status: StatusOrder
}
