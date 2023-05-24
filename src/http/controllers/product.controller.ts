import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createProductValidate } from '../validations/product.validation'
import ProductService from '../../database/services/product.srv'
import { logger } from '../../utils/loggers'
import ProductType from '../../database/types/products.types'
import SuccessMsgResponse from '../responses/ApiResponse/SuccessMsgResponse'
import SuccessResponse from '../responses/ApiResponse/SuccessResponse'
import NotFoundResponse from '../responses/ApiResponse/NotFoundResponse'
import BadPayloadRequest from '../responses/ApiResponse/BadPayloadRequest'

export default class ProductController {
  static async createProduct(req: Request, res: Response):Promise<any> {
    req.body.product_id = uuidv4()
    const { error, value } = createProductValidate(req.body)
    if (error) return new BadPayloadRequest(error.details[0].message).send(res);
    await ProductService.addProduct(value)
    return new SuccessResponse('product created', value).send(res)
  }

  static async getProducts(req: Request, res: Response) {
    const name = req.query?.name as string
    const products:any[] = await ProductService.getProducts({ name })
    logger.info(`${products.length}`)
    if (!products.length) return new NotFoundResponse('Not products found').send(res);
    return new SuccessResponse('success', products).send(res)
  }

  static async updateProduct(req: Request, res: Response):
  Promise<Response<any, Record<string, any>>> {
    const { id } = req.params
    const { error, value } = createProductValidate(req.body)
    if (error) return new BadPayloadRequest(error.details[0].message).send(res)
    await ProductService.update(id, value)
    return new SuccessMsgResponse('product updated').send(res)
  }

  private static async getProduct(req: Request, res: Response) {
    const products:any = await ProductService.getProducts()
    const { params: { name, id } } = req // const { nama } = req.params
    let filteredProducts = products;
    logger.info(name, id)
    if (name) {
      filteredProducts = filteredProducts.filter((product:ProductType) => {
        return product.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      })
      if (filteredProducts || filteredProducts.length < 1) {
        return new NotFoundResponse()
      }
    }
    return new SuccessResponse('success', filteredProducts).send(res)
  }

  static async detailProduct(req:Request, res: Response) {
    const { id } = req.params
    const result = await ProductService.findProduct(id)
    if (!result) new NotFoundResponse('Product not found').send(res)
    return new SuccessResponse('Product deleted', result).send(res)
  }

  static async deleteProduct(req:Request, res:Response) {
    const { id } = req.params;
    const product = await ProductService.findProduct(id)
    if (!product) return new NotFoundResponse('Product not found').send(res)
    await ProductService.delete(id)
    return new SuccessMsgResponse('Product deleted').send(res)
  }
}
