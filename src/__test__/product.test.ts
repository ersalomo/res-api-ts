import mongoose from 'mongoose';
import supertest from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../index';

describe('product', () => {
  beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {})

  describe('detail product', () => {
    it('should return 404 when product not found', async () => {
      const productId = 'product-123';
      await supertest(app).get(`/product/${productId}`).expect(404)
    })
  })
});
