import { Types } from 'mongoose'

export default interface CartType {
  _id: Types.ObjectId,
  user_id: string,
  product_id: string,
  count?: number
}
