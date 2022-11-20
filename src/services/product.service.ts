import { productModel } from '../models/product.model'
import { logger } from '../utils/loggers'
// import { Product } from '../controllers/product.controller'

export const getProductDB = async () => {
  return productModel.find().then((data) => {
    return data
  }).catch((error:any) => {
    logger.error(error)
    return []
  })
}
