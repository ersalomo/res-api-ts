import ApiError, {
  ErrorType
} from './ApiError';

export default class NoEntryError extends ApiError {
  constructor(message = "Entry don't exists") {
    super(ErrorType.NO_ENTRY, message);
  }
}
