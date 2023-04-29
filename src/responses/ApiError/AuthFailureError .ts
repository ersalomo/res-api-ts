import ApiError, {
  ErrorType
} from './ApiError';

export default class AuthFailureError extends ApiError {
  constructor(message = 'Invalid Credentials') {
    super(ErrorType.UNAUTHORIZED, message);
  }
}
