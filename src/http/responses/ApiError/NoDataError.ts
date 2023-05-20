import ApiError, {
  ErrorType
} from './ApiError';

export default class NoDataError extends ApiError {
  constructor(message = 'No data available') {
    super(ErrorType.NO_DATA, message);
  }
}
