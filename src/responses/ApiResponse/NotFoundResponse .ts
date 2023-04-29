import { Response } from 'express';
import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class NotFoundResponse extends ApiResponse {
  constructor(message = 'Not Found') {
    super(StatusCode.FAILURE, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return super.prepare<NotFoundResponse>(res, this, headers);
  }
}
