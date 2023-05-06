import { Response } from 'express';
import ApiResponse from '../ApiResponse/ApiResponse';
import AuthFailureResponse from '../ApiResponse/AuthFailureResponse ';
import AccessTokenErrorResponse from '../ApiResponse/AccessTokenErrorResponse ';
import InternalErrorResponse from '../ApiResponse/InternalErrorResponse ';
import NotFoundResponse from '../ApiResponse/NotFoundResponse ';
import BadRequestResponse from '../ApiResponse/BadRequestResponse ';
import ForbiddenResponse from '../ApiResponse/ForbiddenResponse ';

export enum ErrorType {
  BAD_TOKEN = 'BadTokenError',
  TOKEN_EXPIRED = 'TokenExpiredError',
  UNAUTHORIZED = 'AuthFailureError',
  ACCESS_TOKEN = 'AccessTokenError',
  INTERNAL = 'InternalError',
  NOT_FOUND = 'NotFoundError',
  NO_ENTRY = 'NoEntryError',
  NO_DATA = 'NoDataError',
  BAD_REQUEST = 'BadRequestError',
  FORBIDDEN = 'ForbiddenError',
}

export default class ApiError extends Error {
  constructor(
    public type: ErrorType,
    public message: string = 'error',
  ) {
    super(message);
  }

  /**
   * handle
  */
  public static handle(
    err: ApiError,
    res: Response,
  ): Response {
    switch (err.type) {
      case ErrorType.BAD_TOKEN:
      case ErrorType.TOKEN_EXPIRED:
      case ErrorType.UNAUTHORIZED:
        return new AuthFailureResponse(err.message).send(res);
      case ErrorType.ACCESS_TOKEN:
        return new AccessTokenErrorResponse(err.message).send(res);
      case ErrorType.INTERNAL:
        return new InternalErrorResponse(err.message).send(res);
      case ErrorType.NOT_FOUND:
      case ErrorType.NO_ENTRY:
      case ErrorType.NO_DATA:
        return new NotFoundResponse(err.message).send(res);
      case ErrorType.BAD_REQUEST:
        return new BadRequestResponse(err.message).send(res);
      case ErrorType.FORBIDDEN:
        return new ForbiddenResponse(err.message).send(res);
      default: {
        let { message } = err;
        if (process.env.NODE_ENV === 'development') {
          message = 'Something went wrong'
        }
        return new InternalErrorResponse(message).send(res);
      }
    }
  }
}
