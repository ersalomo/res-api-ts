import mongoose from 'mongoose';
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { v4 as uuidv4 } from 'uuid';
import createServer from '../server';
import { hashing } from '../utils/hashing';
import { UserService } from '../database/services/auth.services';
import ProductService from '../database/services/product.srv';
import ProductType from '../database/types/products.types';
import CartServices from '../database/services/cart.services';
import CartType from '../database/types/cart.type';

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
  beforeEach(async () => {})
  afterEach(async () => {})

  describe('should return data carts when making a GET request to /cart/', () => {
    it('should return data carts', async () => {
      const response = await supertest(app)
        .get('/cart/')
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toEqual([])
      expect(response.body.data.length).toEqual(0)
    })
    it('should return data carts', async () => {
      const productId = () => 'product-id-123' // stub
      const product = {
        product_id: productId(),
        name: 'my-product',
        price: 1000,
        size: 'M'
      }
      const cart = {
        user_id: user.user_id,
        product_id: product.product_id
      }
      await ProductService.addProduct(product as ProductType)
      await new CartServices().addToCart(cart as CartType)
      const response = await supertest(app).get('/cart/')
      expect(response.statusCode).toBe(200)
      expect(response.body.data).toBeDefined()
      expect(response.body.data.length).toEqual(1)
      expect(response.body.data[0]).toHaveProperty('product_id', productId())
    })
  })

  describe('should persist when making a POST request to /cart/', () => {
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
  })
})
