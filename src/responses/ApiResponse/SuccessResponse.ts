import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
  }
}
