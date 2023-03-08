import { v4 } from 'uuid';
import ProductService from '../src/services/product.srv'
import ProductType from '../src/types/products.types'

const ProductTestHelper = {
  async addProduct(product: ProductType = {
    product_id: v4(),
    name: 'New Name Product',
    price: 1_00_000,
    type: 'product dewasa',
    size: 'XL'
  }) {
    await ProductService.addProduct(product);
  },
  async findProduct(id:string) {
    return await ProductService.findProduct(id)
  },
  async deleteProduct(id:string) {
    await ProductService.delete(id)
  },
};

export default ProductTestHelper;
