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
exports.AuthController = void 0;
const uuid_1 = require("uuid");
const user_validation_1 = require("../validations/user.validation");
const auth_srv_1 = require("../services/auth.srv");
const hashing_1 = require("../utils/hashing");
const jwt_1 = require("../utils/jwt");
const NotFoundResponse_1 = __importDefault(require("../responses/ApiResponse/NotFoundResponse "));
const AuthFailureResponse_1 = __importDefault(require("../responses/ApiResponse/AuthFailureResponse "));
const SuccessResponse_1 = __importDefault(require("../responses/ApiResponse/SuccessResponse"));
const BadPayloadRequest_1 = __importDefault(require("../responses/ApiResponse/BadPayloadRequest"));
const SuccessMsgResponse_1 = __importDefault(require("../responses/ApiResponse/SuccessMsgResponse "));
exports.AuthController = {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.user_id = (0, uuid_1.v4)();
            const { error, value } = user_validation_1.UserValidate.createUserValidate(req.body);
            if (error)
                return new BadPayloadRequest_1.default(error.details[0].message).send(res);
            value.password = (0, hashing_1.hashing)(value.password);
            yield auth_srv_1.UserService.createUser(value);
            return new SuccessMsgResponse_1.default('user created').send(res);
        });
    },
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield auth_srv_1.UserService.getUser();
            users = Array.from(users);
            if (users.length < 0)
                return new NotFoundResponse_1.default('Not found user');
            return new SuccessResponse_1.default('success', users).send(res);
        });
    },
    createSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = user_validation_1.UserValidate.loginValidate(req.body);
            if (error) {
                return res.status(400).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: error.details[0].message
                });
            }
            const user = yield auth_srv_1.UserService.findUserByEmail(value.email);
            if (!user)
                return new NotFoundResponse_1.default('Not found user').send(res);
            const isValid = (0, hashing_1.checkPassword)(value.password, user.password);
            if (!isValid)
                new AuthFailureResponse_1.default('Invalid email or password').send(res);
            const accessToken = yield (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1d' });
            const refreshToken = yield (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '10days' });
            return new SuccessResponse_1.default('success', { accessToken, refreshToken }).send(res);
        });
    },
    refreshSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = user_validation_1.UserValidate.refreshTokenValidate(req.body);
            if (error) {
                return new BadPayloadRequest_1.default(error.details[0].message).send(res);
            }
            const { decoded } = yield (0, jwt_1.verifyJWT)(value.refreshToken);
            const user = auth_srv_1.UserService.findUserByEmail(decoded._doc.email);
            if (!user)
                return new NotFoundResponse_1.default('Not found user').send(res);
            const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), {
                expiresIn: '1d'
            });
            return new SuccessResponse_1.default('Successfully refresh token authentication', accessToken).send(res);
        });
    },
};
//# sourceMappingURL=auth.controller.js.map