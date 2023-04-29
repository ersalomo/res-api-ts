import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
  }
}
