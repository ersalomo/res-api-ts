export default interface ResponseType {
    status:string;
    statusCode: number | string;
    message?:string;
    data:any[]
}
