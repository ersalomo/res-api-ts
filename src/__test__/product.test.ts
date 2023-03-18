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
// import { AuthController } from '../controllers/auth.controller';
// import ServerTestHelper from '../../test/ServerTestHelper';
import { hashing } from '../utils/hashing';
import { UserService } from '../services/auth.srv';

const app = createServer();

const admin = {
  user_id: uuidv4(),
  name: 'Ersalomo S',
  email: 'admin_user@gmail.com',
  password: hashing('12345678'),
  role: 'admin'
}
const adminCreated = {
  email: 'admin_user@gmail.com',
  password: '12345678',
}
const user = {
  user_id: uuidv4(),
  name: 'Ersalomo S',
  role: 'user',
  email: 'user_user@gmail.com',
  password: hashing('12345678'),
}

const userCreated = {
  email: 'user_user@gmail.com',
  password: '12345678',
}

describe('product endpoint', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
    await UserService.createUser(admin)
    await UserService.createUser(user)
  })
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close()
  })
  describe('create product', () => {
    const payload:ProductType = {
      product_id: uuidv4(),
      name: 'Baru Belajar Test',
      price: 1000,
      type: 'For Kids',
      size: 'XL'
    };
    it('shoud return 403 when user unthenticated', async () => {
      await supertest(app).post('/product').send(payload).expect(403)
    });
    it('should return 403 when user logged in is user', async () => {
      // const accessToken = await ServerTestHelper.getAccessToken({});
      const { body } = await supertest(app).post('/auth/login').send(userCreated)
      const response = await supertest(app).post('/product')
        .set({ Authorization: `Bearer ${body.token.accessToken}` })
        .send(payload);
      expect(response.statusCode).toBe(403)
    })

    it('should return 400 when logged is admin and payload does not meet specification', async () => {
      payload.type = ''
      // const accessToken = await ServerTestHelper.getAccessToken({ ...{ role: 'admin' } });
      // const accessToken = ServerTestHelper.getAccessToken({})
      const { body } = await supertest(app).post('/auth/login').send(adminCreated)
      const response = await supertest(app).post('/product')
        .set({ Authorization: `Bearer ${body.token.accessToken}` })
        .send(payload);

      expect(response.statusCode).toBe(422)
    });
    it('should return 201 when payload meet specification', async () => {
      payload.type = 'For Kids'
      const { body } = await supertest(app).post('/auth/login').send(adminCreated);
      const response = await supertest(app).post('/product')
        .set({ Authorization: `Bearer ${body.token.accessToken}` })
        .send(payload);
      expect(response.statusCode).toBe(201)
    });
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
      const responseJson = await supertest(app).get(`/product/${payload.product_id}/detail`)
      expect(responseJson.statusCode).toEqual(200);
      expect(responseJson.body.data.name).toEqual(payload.name);
      expect(responseJson.body.data.price).toEqual(payload.price);
      expect(responseJson.body.data.size).toEqual(payload.size);
    })
  })
});
