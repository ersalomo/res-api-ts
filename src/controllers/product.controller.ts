import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { createProductValidate } from '../validations/product.validation'
import { getProductDB, addProduct, getProductById } from '../services/product.srv'
import { logger } from '../utils/loggers'
import ProductType from '../types/products.types'

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
    await addProduct(value)
    return res.status(201).send({
      status: true,
      statusCode: 201,
      message: 'product berhasil ditambahkan'
    })
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
  const products:any = await getProductDB()
  const { params: { name } } = req // const { nama } = req.params
  let filteredProducts = products;
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
    statusCode: 200,
    data: filteredProducts
  })
}
const detailProduct = async (req: Request, res: Response):Promise<Response> => {
  const { id } = req.params
  logger.info(id)
  if (id) {
    const data = await getProductById(id)
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

export { createProduct, getProduct, detailProduct }
