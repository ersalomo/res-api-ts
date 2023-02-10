"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loggers_1 = require("./loggers");
const environment_1 = __importDefault(require("../config/environment"));
const signJWT = (payload, options) => {
    return jsonwebtoken_1.default.sign(payload, environment_1.default.jwt_private_key, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
};
exports.signJWT = signJWT;
const verifyJWT = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, environment_1.default.jwt_public_key);
        return {
            valid: true,
            expired: false,
            decoded
        };
    }
    catch (error) {
        loggers_1.logger.error('Err :[jwt]', error);
        return {
            valid: true,
            expired: error.message === 'jwt is expired or not eligible to use',
            decoded: null,
        };
    }
};
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.js.map