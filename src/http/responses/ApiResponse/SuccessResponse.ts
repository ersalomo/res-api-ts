import { Response } from 'express';
import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class SuccessResponse<T> extends ApiResponse {
  // eslint-disable-next-line no-unused-vars
  constructor(message: string, private data: T, private statusCode = 201) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(res: Response, headers: {[key:string]:string} = {}) : Response {
    return super.prepare<SuccessResponse<T>>(res, this, headers);
  }
}
