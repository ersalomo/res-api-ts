"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest_1 = __importDefault(require("supertest"));
// eslint-disable-next-line import/no-extraneous-dependencies
const mongodb_memory_server_1 = require("mongodb-memory-server");
// import app from '../index';
const uuid_1 = require("uuid");
const server_1 = __importDefault(require("../utils/server"));
const product_srv_1 = __importDefault(require("../services/product.srv"));
// import { AuthController } from '../controllers/auth.controller';
// import ServerTestHelper from '../../test/ServerTestHelper';
const hashing_1 = require("../utils/hashing");
const auth_srv_1 = require("../services/auth.srv");
const app = (0, server_1.default)();
const admin = {
    user_id: (0, uuid_1.v4)(),
    name: 'Ersalomo S',
    email: 'admin_user@gmail.com',
    password: (0, hashing_1.hashing)('12345678'),
    role: 'admin'
};
const adminCreated = {
    email: 'admin_user@gmail.com',
    password: '12345678',
};
const user = {
    user_id: (0, uuid_1.v4)(),
    name: 'Ersalomo S',
    role: 'user',
    email: 'user_user@gmail.com',
    password: (0, hashing_1.hashing)('12345678'),
};
const userCreated = {
    email: 'user_user@gmail.com',
    password: '12345678',
};
describe('product endpoint', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
        yield auth_srv_1.UserService.createUser(admin);
        yield auth_srv_1.UserService.createUser(user);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe('create product', () => {
        const payload = {
            product_id: (0, uuid_1.v4)(),
            name: 'Baru Belajar Test',
            price: 1000,
            type: 'For Kids',
            size: 'XL'
        };
        it('shoud return 403 when user unthenticated', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(app).post('/product').send(payload).expect(403);
        }));
        it('should return 403 when user logged in is user', () => __awaiter(void 0, void 0, void 0, function* () {
            // const accessToken = await ServerTestHelper.getAccessToken({});
            const { body } = yield (0, supertest_1.default)(app).post('/auth/login').send(userCreated);
            const response = yield (0, supertest_1.default)(app).post('/product')
                .set({ Authorization: `Bearer ${body.data.accessToken}` })
                .send(payload);
            expect(response.statusCode).toBe(403);
        }));
        it('should return 400 when logged is admin and payload does not meet specification', () => __awaiter(void 0, void 0, void 0, function* () {
            payload.type = '';
            // const accessToken = await ServerTestHelper.getAccessToken({ ...{ role: 'admin' } });
            // const accessToken = ServerTestHelper.getAccessToken({})
            const { body } = yield (0, supertest_1.default)(app).post('/auth/login').send(adminCreated);
            const response = yield (0, supertest_1.default)(app).post('/product')
                .set({ Authorization: `Bearer ${body.data.accessToken}` })
                .send(payload);
            expect(response.statusCode).toBe(422);
        }));
        it('should return 201 when payload meet specification', () => __awaiter(void 0, void 0, void 0, function* () {
            payload.type = 'For Kids';
            const { body } = yield (0, supertest_1.default)(app).post('/auth/login').send(adminCreated);
            const response = yield (0, supertest_1.default)(app).post('/product')
                .set({ Authorization: `Bearer ${body.data.accessToken}` })
                .send(payload);
            // expect(response.statusCode).toBe(201)
            expect(response.statusCode).toBe(200);
        }));
    });
    describe('detail product', () => {
        it('should return 404 when product not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const productId = 'product-123';
            yield (0, supertest_1.default)(app).get(`/product/${productId}/detail`).expect(404);
        }));
        it('should return 200 when the product exists', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                product_id: (0, uuid_1.v4)(),
                name: 'Baru Belajar Test',
                price: 1000,
                size: 'XL'
            };
            // menggunakan helper saja agar diletakkan di before all
            yield product_srv_1.default.addProduct(payload);
            const responseJson = yield (0, supertest_1.default)(app).get(`/product/${payload.product_id}/detail`);
            expect(responseJson.statusCode).toEqual(200);
            expect(responseJson.body.data.name).toEqual(payload.name);
            expect(responseJson.body.data.price).toEqual(payload.price);
            expect(responseJson.body.data.size).toEqual(payload.size);
        }));
    });
});
//# sourceMappingURL=product.test.js.map