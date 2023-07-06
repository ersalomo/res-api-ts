import { Schema } from 'mongoose'

export default interface CartType {
  _id: Schema.Types.ObjectId,
  user_id: string,
  product_id: string,
  count?: number
}
