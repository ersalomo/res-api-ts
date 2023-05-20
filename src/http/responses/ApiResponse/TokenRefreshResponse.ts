/* eslint-disable no-unused-vars */
import { Response } from 'express';
import ApiResponse, { StatusCode, ResponseStatus } from './ApiResponse'

export default class TokenRefreshResponse extends ApiResponse {
  constructor(
    message:string,
    private accessToken : string,
    private refreshToken : string
  ) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }

  send(
    res: Response,
    headers: {[key:string]: string} = {},
  ):Response {
    return super.prepare<TokenRefreshResponse>(res, this, headers)
  }
}
