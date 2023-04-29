import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
  }
}
