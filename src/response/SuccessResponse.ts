type ResponseSuccess = {
     status:boolean,
     statusCode:number,
     message?:String,
     data?:any[]
}
export default class SuccessResponse {
  static responseSuccess(responseSuccess:ResponseSuccess):ResponseSuccess {
    return responseSuccess
  }
}
