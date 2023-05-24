import { Request, Response } from 'express';
import OrderService from '../../database/services/order.services';
import SuccessMsgResponse from '../responses/ApiResponse/SuccessMsgResponse';
import SuccessResponse from '../responses/ApiResponse/SuccessResponse';
import OrderType from '../../database/types/order.type';

export default class OrderController {
  private _service = new OrderService()

  public createOrder = async (req:Request, res: Response):
    Promise<Response<SuccessMsgResponse>> => {
    await this._service.createOrder(req.body)
    return new SuccessMsgResponse('Order created').send(res)
  }

  public getUserOrder = async (req:Request, res: Response):
    Promise<Response<SuccessResponse<OrderType[]>>> => {
    const { user } = res.locals
    const orders = await this._service.getOrdersByIdUser(user._doc._id)
    return new SuccessResponse('Order created', orders).send(res)
  }
}
