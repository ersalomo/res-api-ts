/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Schema } from 'mongoose'

export enum StatusOrder {
  WAITING = 'WAITING_PAYMENT',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

export default interface OrderType {
  _id: Schema.Types.ObjectId,
  user_id: string,
  product_id: string,
  status: StatusOrder
}
