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
const uuid_1 = require("uuid");
const server_1 = __importDefault(require("../utils/server"));
const hashing_1 = require("../utils/hashing");
const auth_srv_1 = require("../services/auth.srv");
const app = (0, server_1.default)();
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
const userWrongPassword = {
    email: 'user_user@gmail.com',
    password: '123456755',
};
describe('auth endpoint', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
        yield auth_srv_1.UserService.createUser(user);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe('when user register', () => {
        it('should return 422 when payload dont meet specifacition', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                // user_id: v4(),
                name: 'Ersalomo',
                password: 'password',
                email: '',
                role: ''
            };
            const response = yield (0, supertest_1.default)(app).post('/auth/register').send(payload);
            expect(response.statusCode).toBe(422);
        }));
        it('should return 201 when payload meet specifacition', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                // user_id: v4(),
                name: 'Ersalomo',
                password: 'password',
                email: 'ersa@gmail.com',
                role: 'user'
            };
            const response = yield (0, supertest_1.default)(app).post('/auth/register').send(payload);
            expect(response.statusCode).toBe(201);
        }));
    });
    describe('when user login', () => {
        it('should return 400 when payload dont meet specifacition', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                email: 'test@example.com',
                password: ''
            };
            const response = yield (0, supertest_1.default)(app).post('/auth/login')
                .send(payload);
            expect(response.statusCode).toBe(400);
        }));
        it('should return 404 when user does not exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const payload = {
                email: 'test@example.com',
                password: 'passwordadada'
            };
            const res = yield (0, supertest_1.default)(app).post('/auth/login').send(payload);
            expect(res.statusCode).toBe(404);
        }));
        it('should return 401 when password is wrong', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield (0, supertest_1.default)(app).post('/auth/login').send(userWrongPassword);
            expect(res.statusCode).toBe(401);
        }));
        it('should return 200 when payload meet specifacition', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/auth/login')
                .send(userCreated);
            expect(response.statusCode).toBe(200);
        }));
    });
});
//# sourceMappingURL=auth.test.js.map