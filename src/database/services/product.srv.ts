import { ParsedQs } from 'qs'
import { productModel } from '../models/product.model'
import ProductType from '../types/products.types'

export default class ProductService {
  static async getProducts(options?: { name?: string | ParsedQs, id?:string}) {
    const { name } = options || {}
    const searchQuery = typeof name === 'string'
      ? { name: { $regex: name, $options: 'i' } } : {};
    return await productModel.find(searchQuery)
  }

  static async addProduct(payload:ProductType) {
    return await productModel.create(payload)
  }

  static async findProduct(id:string):Promise<Partial<ProductType> | null> {
    return await productModel.findOne({ product_id: id })
  }

  static async update(id:string, data:ProductType) {
    return await productModel.findOneAndUpdate({ product_id: id }, { $set: data })
  }

  static async delete(id:string) {
    return await productModel.findOneAndDelete({ product_id: id })
  }
}
