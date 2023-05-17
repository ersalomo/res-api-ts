import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createProductValidate } from '../validations/product.validation'
import ProductService from '../../database/services/product.srv'
import { logger } from '../../utils/loggers'
import ProductType from '../../database/types/products.types'
import SuccessMsgResponse from '../responses/ApiResponse/SuccessMsgResponse '
import SuccessResponse from '../responses/ApiResponse/SuccessResponse'
import NotFoundResponse from '../responses/ApiResponse/NotFoundResponse '
import BadPayloadRequest from '../responses/ApiResponse/BadPayloadRequest'

export default class ProductController {
  static async createProduct(req: Request, res: Response):Promise<any> {
    req.body.product_id = uuidv4()
    const { error, value } = createProductValidate(req.body)
    if (error) {
      logger.error('Err: product-create', error.details[0].message);
      return new BadPayloadRequest(error.details[0].message).send(res);
    }
    await ProductService.addProduct(value)
    return new SuccessResponse('product created', value).send(res)
  }

  static async getProducts(req: Request, res: Response) {
    const name = req.query?.name as string
    const products:any = await ProductService.getProducts({ name })
    return new SuccessResponse('success', products).send(res)
  }

  static async updateProduct(req: Request, res: Response):
  Promise<Response<any, Record<string, any>>> {
    const { id } = req.params
    const { error, value } = createProductValidate(req.body)
    if (error) {
      return res.status(422).send({
        status: false,
        statusCode: res.statusCode,
        message: error.details[0].message
      });
    }
    // await updateProductById(id, value)
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
    const result:any = await ProductService.findProduct(id)
    if (result) {
      return new SuccessResponse(
        'success',
        result
      ).send(res);
    }
    return res.status(404).send({
      status: false,
      statusCode: res.statusCode,
      message: 'Product not found'
    });
  }

  static async deleteProduct(req:Request, res:Response) {
    const { id } = req.params;
    logger.info('Delete Product...')
    const response = await ProductService.delete(id)
    if (response) {
      logger.info('Response Delete', response)
      return new SuccessMsgResponse('Product berhasil dihapus').send(res)
    }
    return res.status(422).send({
      status: false,
      statusCode: res.statusCode,
      message: 'Product tidak ditemukan'
    });
  }
}
