import ApiError, {
  ErrorType
} from './ApiError';

export default class BadTokenError extends ApiError {
  constructor(message = 'Token is not valid') {
    super(ErrorType.BAD_TOKEN, message);
  }
}
