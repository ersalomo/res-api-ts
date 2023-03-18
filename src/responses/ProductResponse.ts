import { IResponseProduct } from '../types/Response';

type ResponseProduct<T> = Omit<IResponseProduct<T>, 'message'>

export default class ProductResponse<T> implements ResponseProduct<T> {
  status: string;

  statusCode: number | 201;

  data: Array<T>;

  constructor(status: string, statusCode: number, data: Array<T>) {
    this.status = status;
    this.statusCode = statusCode;
    this.data = data;
  }
}
