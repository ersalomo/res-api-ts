import ProductType from '../../types/products.types';
import { createProductValidate, updateProductValidate } from '../product.validation';

describe('product-validation test', () => {
  describe('Function createProductValidate', () => {
    it('should validate product payload correctly', async () => {
      // Arrange
      const uuid = () => 'product-123' // stub
      const payload: ProductType = {
        product_id: uuid(),
        name: 'Product 123',
        price: 100_000,
        type: 'product type',
        size: 'XL'
      }
      // Act
      const { value } = createProductValidate({
        product_id: 'product-123',
        name: 'Product 123',
        price: 100_000,
        type: 'product type',
        size: 'XL'
      } as ProductType)
      // Assert
      expect(value).toEqual(payload)
    })
  })

  describe('', () => {
    it('should validate product payload correctly', async () => {
      // Arrange
      const uuid = () => 'product-123' // stub
      const payload: ProductType = {
        product_id: uuid(),
        name: 'Product 123',
        price: 100_000,
        type: 'product type',
        size: 'XL'
      }
      // Act
      const { value } = updateProductValidate({
        product_id: 'product-123',
        name: 'Product 123',
        price: 100_000,
        type: 'product type',
        size: 'XL'
      } as ProductType)
      // Assert
      expect(value).toEqual(payload)
    })
  })
});
