import { Response } from 'express';
import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token'

  constructor(message = 'Access token invalid') {
    super(
      StatusCode.INVALID_ACCESS_TOKEN,
      ResponseStatus.UNAUTHORIZED,
      message
    )
  }

  send(res: Response, headers: { [key:string]: string } = {}): Response {
    // headers.instruction = this.instruction
    return super.prepare<AccessTokenErrorResponse>(res, this, headers)
  }
}
