import ApiError, {
  ErrorType
} from './ApiError';

export default class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(ErrorType.BAD_REQUEST, message);
  }
}
