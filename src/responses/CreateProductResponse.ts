import { IResponse } from '../types/Response'

interface IProductReponse extends IResponse {}

export default class CreateProductReponse implements IProductReponse {
  status: string;

  statusCode: number | 201;

  message: string;

  constructor(status: string, statusCode: number, message: string) {
    this.status = status;
    this.statusCode = statusCode;
    this.message = message;
  }
}
