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
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = __importDefault(require("../config/environment"));
const AccessTokenError_1 = __importDefault(require("../responses/ApiError/AccessTokenError "));
const signJWT = (payload, options) => __awaiter(void 0, void 0, void 0, function* () {
    const privateKey = environment_1.default.PRIVATE_KEY || (yield environment_1.default.jwt_private_key());
    if (!privateKey)
        throw new AccessTokenError_1.default('Missing private key');
    return jsonwebtoken_1.default.sign(payload, privateKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
});
exports.signJWT = signJWT;
const verifyJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const publicKey = environment_1.default.PUBLIC_KEY || (yield environment_1.default.jwt_public_key());
    const decoded = jsonwebtoken_1.default.verify(token, publicKey);
    return {
        valid: true,
        expired: false,
        decoded
    };
});
exports.verifyJWT = verifyJWT;
//# sourceMappingURL=jwt.js.map