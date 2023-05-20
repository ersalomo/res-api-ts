import ApiError, {
  ErrorType
} from './ApiError';

export default class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(ErrorType.NOT_FOUND, message);
  }
}
