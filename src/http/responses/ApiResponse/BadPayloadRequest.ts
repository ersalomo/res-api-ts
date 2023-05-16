import ApiResponse, {
  StatusCode,
  ResponseStatus
} from './ApiResponse';

export default class BadPayloadRequest extends ApiResponse {
  errors: string

  constructor(errors :string, message = 'Bad Payload Request',) {
    super(StatusCode.RETRY, ResponseStatus.BAD_PAYLOAD, message)
    this.errors = errors
  }
}
