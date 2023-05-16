import ApiError, {
  ErrorType
} from './ApiError';

export default class ForbiddenError extends ApiError {
  constructor(message = 'Permission denied') {
    super(ErrorType.FORBIDDEN, message);
  }
}
