import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
  }
}
