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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const uuid_1 = require("uuid");
const user_validation_1 = require("../validations/user.validation");
const loggers_1 = require("../utils/loggers");
const auth_srv_1 = require("../services/auth.srv");
const hashing_1 = require("../utils/hashing");
// import UserType from '../types/user.type';
const jwt_1 = require("../utils/jwt");
exports.AuthController = {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.user_id = (0, uuid_1.v4)();
            const { error, value } = user_validation_1.UserValidate.createUserValidate(req.body);
            if (error) {
                loggers_1.logger.error('Err:[error create user]', error.details[0].message);
                return res.status(422).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: error,
                });
            }
            try {
                value.password = (0, hashing_1.hashing)(value.password);
                yield auth_srv_1.UserService.createUser(value);
                return res.status(201).send({
                    status: true,
                    statusCode: res.statusCode,
                    message: 'Successfully create new user',
                });
            }
            catch (err) {
                loggers_1.logger.error('Err: Error server auth controller', err);
                return res.status(422).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: err,
                });
            }
        });
    },
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let users = yield auth_srv_1.UserService.getUser();
            users = Array.from(users);
            if (users.length < 0) {
                return res.status(404).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: 'User not found!'
                });
            }
            return res.status(200).send({
                status: true,
                statusCode: res.statusCode,
                data: users
            });
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
            try {
                const user = yield auth_srv_1.UserService.findUserByEmail(value.email);
                const isValid = (0, hashing_1.checkPassword)(value.password, user.password);
                if (!isValid) {
                    return res.status(401).json({
                        message: 'invalid email or password'
                    });
                }
                const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1d' });
                const refreshToken = (0, jwt_1.signJWT)(Object.assign({}, user), { expiresIn: '1year' });
                return res.status(200).json({
                    status: true,
                    statusCode: res.statusCode,
                    message: 'Login success',
                    token: { accessToken, refreshToken }
                });
            }
            catch (err) {
                console.log(err);
                loggers_1.logger.error('Err: login controller', err);
                return res.status(500).json({
                    status: false,
                    statusCode: res.statusCode,
                    message: 'There something went error'
                });
            }
        });
    },
    refreshSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = user_validation_1.UserValidate.refreshTokenValidate(req.body);
            if (error) {
                return res.status(400).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: error.details[0].message
                });
            }
            try {
                const { decoded } = (0, jwt_1.verifyJWT)(value.refreshToken);
                const user = auth_srv_1.UserService.findUserByEmail(decoded._doc.email);
                if (!user)
                    return false;
                const accessToken = (0, jwt_1.signJWT)(Object.assign({}, user), {
                    expiresIn: '1d'
                });
                return res.status(200).send({
                    status: 'success',
                    accessToken,
                    message: 'Successfully refresh token authentication',
                });
            }
            catch (err) {
                loggers_1.logger.error('Err: Error AuthController refresh session', err);
                return res.status(422).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: err,
                });
            }
        });
    },
};
//# sourceMappingURL=auth.controller.js.map