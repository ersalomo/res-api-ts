import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
  }
}
