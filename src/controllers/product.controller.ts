import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createProductValidate } from '../validations/product.validation'
import ProductService from '../services/product.srv'
import { logger } from '../utils/loggers'
import ProductType from '../types/products.types'
import SuccessResponse from '../response/SuccessResponse'
// import * as Res from '../response/Response.response'
// import { productModel } from '../models/product.model'
// import Controller from '../types/product-controller.types'

export default class ProductController {
  static async createProduct(req: Request, res: Response):Promise<any> {
    req.body.product_id = uuidv4()
    const { error, value } = createProductValidate(req.body)
    if (error) {
      logger.error('Err: product-create', error.details[0].message);
      return res.status(422).send({
        status: false,
        statusCode: 422,
        message: error.details[0].message
      });
    }
    try {
      await ProductService.addProduct(value)
      return res.status(201).send(
        SuccessResponse.responseSuccess({
          status: true,
          statusCode: res.statusCode,
          message: 'Product created successfully'
        })
      )
    } catch (err) {
      logger.error(`Error: ${err}`);
      return res.status(422).send({
        status: false,
        statusCode: 422,
        message: 'gagal menambah product'
      })
    }
  }

  static async getProducts(req: Request, res: Response) {
    const products:any = await ProductService.getProducts()
    const { name, id } = req.params
    let filteredProducts = products;
    // if (id) {
    //   const product = await this.detailProduct(id)
    //   if (product) {
    //     return res.status(200).send({
    //       status: true,
    //       statusCode: res.statusCode,
    //       data: product
    //     })
    //   }
    //   return res.status(404).send({
    //     status: false,
    //     statusCode: res.statusCode,
    //     message: 'Product not found'
    //   })
    // }
    if (name) {
      filteredProducts = products.filter((product: ProductType) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
      })
      if (filteredProducts || filteredProducts.length < 1) {
        return res.status(404).send({
          status: false,
          statusCode: 404,
          data: []
        })
      }
      return res.status(200).send({
        status: false,
        statusCode: 404,
        data: filteredProducts
      })
    }
    return res.status(200).send({
      status: true,
      statusCode: res.statusCode,
      data: filteredProducts
    })
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
    try {
    // await updateProductById(id, value)
      await ProductService.update(id, value)
      return res.status(200).send({
        status: true,
        statusCode: 200,
        message: 'data berhasil diupdate',
      })
    } catch (err) {
      return res.status(500).send({})
    }
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
        return res.status(404).send({
          status: false,
          statusCode: 404,
          data: []
        })
      }
    }
    return res.status(200).send({
      status: true,
      statusCode: res.statusCode,
      data: filteredProducts
    })
  }

  static async detailProduct(req:Request, res: Response) {
    const { id } = req.params
    try {
      const result = await ProductService.findProduct(id)
      if (result) {
        return res.status(200).send({
          status: true,
          statusCode: res.statusCode,
          data: result
        });
      }
      return res.status(404).send({
        status: false,
        statusCode: res.statusCode,
        message: 'Product not found'
      });
    } catch (err) {
      logger.error(err)
      return false;
    }
  }

  static async deleteProduct(req:Request, res:Response) {
    const { id } = req.params;
    logger.info('Delete Product...')
    try {
      const response = await ProductService.delete(id)
      if (response) {
        logger.info('Response Delete', response)
        return res.status(200).send({
          status: true,
          statusCode: res.statusCode,
          message: 'Product berhasil dihapus'
        });
      }
      return res.status(422).send({
        status: false,
        statusCode: res.statusCode,
        message: 'Product tidak ditemukan'
      });
    } catch (err) {
      logger.error(`Err: error delete product ${err}`)
      return false
    }
  }
}
