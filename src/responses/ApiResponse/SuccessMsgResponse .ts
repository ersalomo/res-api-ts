import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}
