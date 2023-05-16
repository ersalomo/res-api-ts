import ProductType from '../../../types/products.types';
// import { createProductValidate, updateProductValidate } from '../product.validation';
import * as validator from '../product.validation';

describe('product-validation test', () => {
  describe('Function createProductValidate', () => {
    it('should throw an error when payload dont meet specification', async () => {
      // Arrange
      const uuid = () => 'product-123' // stub
      const payload: ProductType = {
        product_id: uuid(),
        name: 'Product 123',
        price: 10_000,
        type: '',
        size: 'XL'
      }
      // Act
      const { error } = validator.createProductValidate(payload)
      // Assert
      // eslint-disable-next-line no-useless-escape
      expect(error?.message).toBe('\"type\" is not allowed to be empty')
    })
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
      const { value } = validator.createProductValidate({
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

  describe('Function updateProductValidate', () => {
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
      const { value } = validator.updateProductValidate({
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
