import mongoose from 'mongoose';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
// eslint-disable-next-line import/no-extraneous-dependencies
import { MongoMemoryServer } from 'mongodb-memory-server';
import { v4 as uuidv4 } from 'uuid'
import createServer from '../server';
import { hashing } from '../utils/hashing';
import { UserService } from '../database/services/auth.srv';

const app = createServer()

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
const userWrongPassword = {
  email: 'user_user@gmail.com',
  password: '123456755',
}

describe('auth endpoint', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri())
    await UserService.createUser(user)
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

    it('should return 404 when user does not exist', async () => {
      const payload = {
        email: 'test@example.com',
        password: 'passwordadada'
      }
      const res = await supertest(app).post('/auth/login').send(payload)
      expect(res.statusCode).toBe(404);
    })

    it('should return 401 when password is wrong', async () => {
      const res = await supertest(app).post('/auth/login').send(userWrongPassword)
      expect(res.statusCode).toBe(401);
    })

    it('should return 200 when payload meet specifacition', async () => {
      const response = await supertest(app).post('/auth/login')
        .send(userCreated)
      expect(response.statusCode).toBe(200)
    })
  })
});
