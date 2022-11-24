import { productModel } from '../models/product.model'
import { logger } from '../utils/loggers'
import ProductType from '../types/products.types'

const addProduct = async (payload: ProductType) => {
  return await productModel.create(payload)
}
// Promise<ProductType[]>
const getProductDB = async () => {
  return await productModel
    .find()
    .then((data) => {
      return data
    }).catch((error) => {
      logger.error(error)
    })
}
const getProductById = async (id:string) => {
  return await productModel.findOne({ product_id: id })
}
export { getProductDB, addProduct, getProductById }
