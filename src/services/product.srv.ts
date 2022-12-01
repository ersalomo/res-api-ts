import { productModel } from '../models/product.model'
import { logger } from '../utils/loggers'
import ProductType from '../types/products.types'

export default class ProductService {
  static async getProducts() {
    return await productModel
      .find()
      .then((data) => {
        return data
      }).catch((error) => {
        logger.error(error)
      })
  }

  static async addProduct(payload:ProductType) {
    return await productModel.create(payload)
  }

  static async findProduct(id:string) {
    return await productModel.findOne({ product_id: id })
  }

  static async update(id:string, data:ProductType) {
    return await productModel.findOneAndUpdate({ product_id: id }, { $set: data })
  }
}

// Promise<ProductType[]>
