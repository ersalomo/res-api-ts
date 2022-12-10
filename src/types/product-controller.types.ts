import { Response } from 'express'

interface Controller{
 createProduct():Promise<Response<any, Record<string, any>>>;
getProduct():Promise<Response<any, Record<string, any>>>;
updateProduct():Promise<Response<any, Record<string, any>>>;
detailProduct():Promise<Response<any, Record<string, any>>>;

}
type Controllers = {
//  async x():string
}

// export default Controller;
export { Controllers, Controller };
