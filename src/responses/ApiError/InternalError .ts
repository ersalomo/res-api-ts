import ApiError, {
  ErrorType
} from './ApiError';

export default class InternalError extends ApiError {
  constructor(message = 'Internal error') {
    super(ErrorType.INTERNAL, message);
  }
}
