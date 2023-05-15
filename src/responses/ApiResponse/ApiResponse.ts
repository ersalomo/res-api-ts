/* eslint-disable no-useless-constructor */
/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import { Response } from 'express';
import { logger } from '../../utils/loggers';

// Helper code for the API consumer to understand the error and handle is accordingly
export enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

export enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  BAD_PAYLOAD = 422,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export default abstract class ApiResponse {
  constructor(
    protected statudCode: StatusCode,
    protected status: ResponseStatus,
    protected message:string
  ) {}

  protected prepare<T extends ApiResponse>(
    res: Response,
    response: T,
    headers: {[key:string]:string}
  ): Response {
    // for (const [ key, value ] of Object.entries(headers)) {
    //   res.append(key, value);
    // }
    Object.entries(headers).forEach((value) => {
      const [key, val] = value
      logger.info(`Info [${value}]`)
      res.append(key, val);
    })
    return res
      .status(this.status)
      .json(ApiResponse.sanitize(response));
  }

  public send(res: Response, headers: {[key:string]: string} = {}): Response {
    return this.prepare<ApiResponse>(res, this, headers)
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone:T = {} as T;
    Object.assign(clone, response);
    // @ts-ignore
    // delete clone.status
    // for (const i in clone) {
    //   if (typeof clone[i] === 'undefined') delete clone[i];
    // }

    // Object.entries(clone).forEach((value) => {
    //   if (typeof value === 'undefined') delete clone[value];
    // })
    return clone;
  }
}
