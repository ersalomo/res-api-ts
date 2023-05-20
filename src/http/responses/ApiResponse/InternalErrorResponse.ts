import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
  }
}
