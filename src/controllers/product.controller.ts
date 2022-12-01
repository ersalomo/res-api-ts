import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createProductValidate } from '../validations/product.validation'
import ProductService from '../services/product.srv'
import { logger } from '../utils/loggers'
import ProductType from '../types/products.types'
import SuccessResponse from '../response/SuccessResponse'
import Controller from '../types/product-controller.types'

export default class ProductController implements Controller {
  createProduct(): Promise<Response<any, Record<string, any>>> {
    throw new Error('Method not implemented.')
    
  }

  getProduct(): Promise<Response<any, Record<string, any>>> {
    throw new Error('Method not implemented.')
  }

  updateProduct(): Promise<Response<any, Record<string, any>>> {
    throw new Error('Method not implemented.')
  }

  detailProduct(): Promise<Response<any, Record<string, any>>> {
    throw new Error('Method not implemented.')
  }
}

const createProduct = async (req: Request, res: Response) => {
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
    // await addProduct(value)
    await ProductService.addProduct(value)
    return res.status(201).send(
      SuccessResponse.responseSuccess({
        status: true,
        statusCode: res.statusCode,
        message: 'Product created successfully'
      })
    )
  } catch (err) {
    logger.error(err)
    logger.info('Error createProduct', err)
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: 'gagal menambah product'
    })
  }
}

const getProduct = async (req: Request, res: Response) => {
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
const detailProduct = async (req: Request, res: Response):Promise<Response> => {
  const { id } = req.params
  console.info(id)
  if (id) {
    // const data = await getProductById(id)
    const data = await ProductService.findProduct(id)
    return res.status(200).send({
      status: true,
      statusCode: 200,
      data
    })
  }
  return res.status(404).send({
    status: false,
    statusCode: 402,
    message: 'Product not found'
  })
}

const updateProduct = async (req: Request, res: Response):Promise<
Response<any, Record<string, any>>> => {
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

export { createProduct, getProduct, detailProduct, updateProduct }
