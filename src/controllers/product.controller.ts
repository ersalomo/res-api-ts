import { Request, Response } from 'express'
import { logger } from '../utils/loggers'
import { createProductValidate } from '../validations/product.validation'

export const createProduct = (req: Request, res: Response) => {
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
    name: string,
    price: number,
    type?: string | null
}

export const getProduct = (req: Request, res: Response) => {
  const products: Array<Product> = [
    { name: 'Asuz Xx he', price: 1 },
    { name: 'Mac book pro Xvs 899', price: 13_000_900 },
    { name: 'Mac book pro Xvs 899', price: 1_000_900 },
    { name: 'Acer pro VcY 9023a', price: 2_030_000 },
    { name: 'Azuz Zenbook 782x', price: 5_000_934 },
    { name: 'Laptop Asus', price: 200_000, type: 'asuz 9002 A' },
    { name: 'Laptop Acer', price: 250_000, type: 'asuz aspore 89X' }
  ]

  const { params: { name } } = req // const { nama } = req.params
  let filteredProducts: Product[] | [] = products;
  if (name) {
    filteredProducts = products?.filter((product) => product.name.includes(name))
  }
  // validate if filteredProduct code 404 length is < 1
  return res.status(200).send({
    status: true,
    'status-code': 200,
    data: filteredProducts
  })
//   next()
}
