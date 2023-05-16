import ApiError, {
  ErrorType
} from './ApiError';

export default class TokenExpiredError extends ApiError {
  constructor(message = 'Token is expired') {
    super(ErrorType.TOKEN_EXPIRED, message);
  }
}
