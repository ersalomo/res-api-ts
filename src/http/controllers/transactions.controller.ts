import { Request, Response } from 'express';
import TransactionService from '../../database/services/transactions.services';
import SuccessResponse from '../responses/ApiResponse/SuccessResponse';

export default class TransactionController {
  private _service = new TransactionService();

  public insertTransaction = async (req: Request, res: Response) => {
    const transaction = await this._service.createTransaction(req.body)
    return new SuccessResponse('success', transaction).send(res)
  }
}
