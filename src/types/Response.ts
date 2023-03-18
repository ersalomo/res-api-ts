interface IResponse {
  status: string
  statusCode: number
  message: string;
}

interface IResponseProduct<T> extends IResponse {
  data: Array<T> | []
}

export {
  IResponse,
  IResponseProduct
}
