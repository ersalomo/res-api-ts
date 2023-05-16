import ApiError, {
  ErrorType
} from './ApiError';

export default class AccessTokenError extends ApiError {
  constructor(message = 'Invalid access token') {
    super(ErrorType.ACCESS_TOKEN, message);
  }
}
