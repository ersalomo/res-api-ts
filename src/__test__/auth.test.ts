import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
// import { v4 } from 'uuid'
import createServer from '../utils/server';

const app = createServer()
describe('auth endpoint', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
  })
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close()
  })
  describe('when user register', () => {
    it('should return 422 when payload dont meet specifacition', async () => {
      const payload = {
        // user_id: v4(),
        name: 'Ersalomo',
        password: 'password',
        email: '',
        role: ''
      };
      const response = await supertest(app).post('/auth/register').send(payload);
      expect(response.statusCode).toBe(422)
    })
    it('should return 201 when payload meet specifacition', async () => {
      const payload = {
        // user_id: v4(),
        name: 'Ersalomo',
        password: 'password',
        email: 'ersa@gmail.com',
        role: 'user'
      };
      const response = await supertest(app).post('/auth/register').send(payload);
      expect(response.statusCode).toBe(201)
    })
  })
  describe('when user login', () => {
    it('should return 400 when payload dont meet specifacition', async () => {
      const payload = {
        email: 'test@example.com',
        password: ''
      }
      const response = await supertest(app).post('/auth/login')
        .send(payload)

      expect(response.statusCode).toBe(400)
    })
    it('should return 200 when payload meet specifacition', async () => {
      const payload = {
        email: 'test@example.com',
        password: 'password'
      }
      const response = await supertest(app).post('/auth/login')
        .send(payload)

      expect(response.statusCode).toBe(200)
    })
  })
});
