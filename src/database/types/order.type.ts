/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Schema } from 'mongoose'

export enum StatusOrder {
  WAITING = 'WAITING_PAYMENT',
  PAID = 'PAID',
  CANCELED = 'CANCELED',
}

export default interface OrderType {
  id: String,
  user_id: String,
  product_id: String,
  status?: StatusOrder
  count: Number
}
