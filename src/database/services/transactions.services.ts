import TransactionModel from '../models/transaction.model';
import TransactionType from '../types/transaction.type';

export default class TransactionService {
  private _model = TransactionModel

  public async createTransaction(payload: TransactionType) {
    return this._model.create(payload)
  }
}
