import { Request, Response } from 'express'
import { logger } from '../utils/loggers'
import { createProductValidate } from '../validations/product.validation'
import { getProductDB } from '../services/product.service'

const createProduct = (req: Request, res: Response) => {
  const { error, value } = createProductValidate(req.body)
  if (error) {
    logger.error('Err: product-create', error.details[0].message);
    return res.status(422).send({
      status: false,
      statusCode: 422,
      message: error.details[0].message
    });
  }
  logger.info('product added successfully')
  return res.status(200).send({
    status: true,
    statusCode: 200,
    message: 'Product added successfully',
    data: value
  })
}
type Product = {
    product_id: string,
    name: string,
    price: number,
    type?: string,
    size?:String
}

const getProduct = async (req: Request, res: Response) => {
  const products = await getProductDB()
  const { params: { name } } = req // const { nama } = req.params
  let filteredProducts = products;
  if (name) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name?.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    })
  }
  if (filteredProducts.length < 1) {
    return res.status(404).send({
      status: false,
      statusCode: 404,
      data: []
    })
  }
  return res.status(200).send({
    status: true,
    'status-code': 200,
    data: filteredProducts
  })
//   next()
}

export { createProduct, getProduct, Product }
