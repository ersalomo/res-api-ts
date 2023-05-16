import { Schema } from 'mongoose'

export default interface CartType {
  cart_id: Schema.Types.String,
  user_id: Schema.Types.ObjectId,
  product_id: Schema.Types.ObjectId,
  count?: number
}
