import { Schema, model } from 'mongoose';
import TransactionType from '../types/transaction.type';

const DOC_NAME = 'Transaction'
const COLL_NAME = 'transactions'

const schema = new Schema<TransactionType>({
  transaction_id: Schema.Types.String,
  order_id: Schema.Types.ObjectId,
  nameBank: Schema.Types.String
});

const TransactionModel = model<TransactionType>(DOC_NAME, schema, COLL_NAME)

export default TransactionModel;
