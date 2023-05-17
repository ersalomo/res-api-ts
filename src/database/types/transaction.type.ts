import { Schema } from 'mongoose'

export default interface TransactionType {
  transaction_id: string
  order_id: Schema.Types.ObjectId
  nameBank: string
}
