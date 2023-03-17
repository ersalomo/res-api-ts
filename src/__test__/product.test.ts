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
import ServerTestHelper from '../../test/ServerTestHelper';

const app = createServer();

describe('product endpoint', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
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
      const accessToken = ServerTestHelper.getAccessToken({})
      const response = await supertest(app).post('/product')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(payload);
      expect(response.statusCode).toBe(403)
    })

    it('should return 400 when logged is admin and payload does not meet specification', async () => {
      payload.type = ''
      // const accessToken = await ServerTestHelper.getAccessToken({ ...{ role: 'admin' } });
      // const accessToken = ServerTestHelper.getAccessToken({})
      const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsibmFtZSI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJyb2xlIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJ1c2VyX2lkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX192IjoiaW5pdCJ9LCJzdGF0ZXMiOnsiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJ1c2VyX2lkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwibmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInJvbGUiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjNhZmE0OTMxMmJjN2M1MDUyYjVlZmE5IiwidXNlcl9pZCI6IjA0ZTJhZTM1LWJiOGUtNGFlOC04OTRiLTlmNzNjNTE2MGMwZSIsImVtYWlsIjoiZXJzYWxvbW8yMDAyQGdtYWlsLmNvbSIsIm5hbWUiOiJFcnNhbG9tbyIsInBhc3N3b3JkIjoiJDJiJDEwJEZvem5mY28zS2FvUWRZZU9OR1BtOU9NeERKTTJPSkI1SE44TGFLWWU2d1pmdUlaRFd3NVJ1Iiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0zMVQwMjo1NToxNS4wNjZaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0zMVQwMjo1NToxNS4wNjZaIiwiX192IjowfSwiaWF0IjoxNjc5MDYzMDA1LCJleHAiOjE2NzkxNDk0MDV9.TaMHqUANVOAyjNR_lsNHqTxZgbdCUqtatzUEvFEg5dWIXTiQS5HNPm4BzD0TsFw8HAdmDWYv_0d2Nu3bSRejVQpnMuePViHjJ7Tq4mUMRveNgslpqWQ0xyThMMiWHoy0lMMFweFcT2iuAX4ei25dsqYxTO_vRYGx_U1z80HcWtpJ-Y6wGiKIqlg2FDGVZfjhUNjEugnGpZuSmnWUJ1mhKL6E3EVwxxYKpTTUUgXfENF7TrDutuIbWAwPMi9pvoMnDAhlDZ6wj2HMpgkdeEPZMXkp7eqOxrFeh415eEUJ1OEjdjdapvbYipcgvv5WEv7vvf4LJuCUTfDL0Ni-gZUjcQ'
      const response = await supertest(app).post('/product')
        .set({ Authorization: `Bearer ${accessToken}` })
        .send(payload);
      expect(response.statusCode).toBe(422)
    });
    it('should return 201 when payload meet specification', async () => {
      payload.type = 'For Kids'
      const accessToken = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsibmFtZSI6ImluaXQiLCJwYXNzd29yZCI6ImluaXQiLCJyb2xlIjoiaW5pdCIsIl9pZCI6ImluaXQiLCJ1c2VyX2lkIjoiaW5pdCIsImVtYWlsIjoiaW5pdCIsImNyZWF0ZWRBdCI6ImluaXQiLCJ1cGRhdGVkQXQiOiJpbml0IiwiX192IjoiaW5pdCJ9LCJzdGF0ZXMiOnsiZGVmYXVsdCI6e30sImluaXQiOnsiX2lkIjp0cnVlLCJ1c2VyX2lkIjp0cnVlLCJlbWFpbCI6dHJ1ZSwibmFtZSI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsInJvbGUiOnRydWUsImNyZWF0ZWRBdCI6dHJ1ZSwidXBkYXRlZEF0Ijp0cnVlLCJfX3YiOnRydWV9fX0sInNraXBJZCI6dHJ1ZX0sIiRpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX2lkIjoiNjNhZmE0OTMxMmJjN2M1MDUyYjVlZmE5IiwidXNlcl9pZCI6IjA0ZTJhZTM1LWJiOGUtNGFlOC04OTRiLTlmNzNjNTE2MGMwZSIsImVtYWlsIjoiZXJzYWxvbW8yMDAyQGdtYWlsLmNvbSIsIm5hbWUiOiJFcnNhbG9tbyIsInBhc3N3b3JkIjoiJDJiJDEwJEZvem5mY28zS2FvUWRZZU9OR1BtOU9NeERKTTJPSkI1SE44TGFLWWU2d1pmdUlaRFd3NVJ1Iiwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0xMi0zMVQwMjo1NToxNS4wNjZaIiwidXBkYXRlZEF0IjoiMjAyMi0xMi0zMVQwMjo1NToxNS4wNjZaIiwiX192IjowfSwiaWF0IjoxNjc5MDYzMDA1LCJleHAiOjE2NzkxNDk0MDV9.TaMHqUANVOAyjNR_lsNHqTxZgbdCUqtatzUEvFEg5dWIXTiQS5HNPm4BzD0TsFw8HAdmDWYv_0d2Nu3bSRejVQpnMuePViHjJ7Tq4mUMRveNgslpqWQ0xyThMMiWHoy0lMMFweFcT2iuAX4ei25dsqYxTO_vRYGx_U1z80HcWtpJ-Y6wGiKIqlg2FDGVZfjhUNjEugnGpZuSmnWUJ1mhKL6E3EVwxxYKpTTUUgXfENF7TrDutuIbWAwPMi9pvoMnDAhlDZ6wj2HMpgkdeEPZMXkp7eqOxrFeh415eEUJ1OEjdjdapvbYipcgvv5WEv7vvf4LJuCUTfDL0Ni-gZUjcQ';
      const response = await supertest(app).post('/product')
        .set({ Authorization: `Bearer ${accessToken}` })
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
