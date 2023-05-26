import supertest from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../server';
import { v4 as uuidv4 } from 'uuid';
import { hashing } from '../utils/hashing';
import { UserService } from '../database/services/auth.services';
import ProductService from '../database/services/product.srv';
import ProductType from '../database/types/products.types';

const app = createServer()
const user = {
  user_id: uuidv4(),
  name: 'Ersalomo',
  role: 'user',
  email: 'ersalomo@gmail.com',
  password: hashing('12345678')
}
const userCreated = {
  email: 'ersalomo@gmail.com',
  password: '12345678'
}

const admin = {
  user_id: uuidv4(),
  name: 'Ersalomo S',
  role: 'admin',
  email: 'user_admin@gmail.com',
  password: hashing('12345678'),
}

describe('cart endpoint', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
    await UserService.createUser(user)
  })
  describe('cart/ method[get]', () => {
    it('should return data carts', async () => {
      const response = await supertest(app)
        .get('/cart/')
      expect(response.statusCode)
        .toBe(200)
    })
  })

  describe('cart/ method[post]', () => {
    it('should return status 403 when user did not login', async () => {
      // Arrange
      // Act
      const response = await supertest(app)
        .post('/cart/product-123')
      // Assert
      expect(response.statusCode)
        .toBe(403)
    })
    it('should return 404 when product does not exists', async () => {
      // Arrange
      const { body } = await supertest(app)
        .post('/auth/login')
        .send(userCreated)
      const productId = 'product-123'
      const response = await supertest(app)
        .post(`/cart/${productId}`)
        .set({ Authorization: `Bearer ${body.data.accessToken}` })
        .send()
      // Assert
      expect(response.statusCode)
        .toBe(404)
    })
    it('should return 201', async () => {
      // Arrange
      const { body } = await supertest(app)
        .post('/auth/login')
        .send(userCreated)
      const product = {
        product_id: 'product-123',
        name: 'my-product',
        price: 1000,
        size: 'M'
      }
      await ProductService.addProduct(product as ProductType)
      // Act
      const response = await supertest(app)
        .post(`/cart/${product.product_id}`)
        .set({ Authorization: `Bearer ${body.data.accessToken}` })
        .send()
      // Assert
      expect(response.statusCode).toBe(201)
    })

    it('should return data carts', async () => {
      const response = await supertest(app).get('/cart/')
      expect(response.statusCode)
        .toBe(200)
    })
  })
})
