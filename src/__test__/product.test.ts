import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
// import app from '../index';
import { v4 as uuidv4 } from 'uuid'
import ProductType from '../types/products.types';
import createServer from '../utils/server';
import ProductService from '../services/product.srv';

const app = createServer();

describe('product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close()
  })

  describe('detail product', () => {
    it('should return 404 when product not found', async () => {
      const productId = 'product-123';
      await supertest(app).get(`/product/${productId}/detail`).expect(404)
    })
    it('should return 200 when the product exists', async () => {
      const payload:ProductType = {
        product_id: uuidv4(),
        name: 'Baru Belajar Test',
        price: 1000,
        size: 'XL'
      };
      // menggunakan helper saja agar diletakkan di before all
      await ProductService.addProduct(payload);
      const response = await supertest(app).get(`product/${payload.product_id}/detail`)
      expect(response).toEqual('')
      expect(response.statusCode).toEqual(200);
      expect(response.status).toEqual(true);
    })
  })
});
