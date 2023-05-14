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
const jwt_1 = require("../utils/jwt");
const AccessTokenError_1 = __importDefault(require("../responses/ApiError/AccessTokenError "));
// import AccessTokenErrorResponse from '../responses/ApiResponse/AccessTokenErrorResponse ';
const deserializedToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace(/^Bearer\s/, '');
    /**
    if (!accessToken) return new AccessTokenErrorResponse('error acces token deserialized').send(res)
    if (!accessToken) return next(new AccessTokenError())
    */
    if (!accessToken)
        return next();
    const { decoded, expired } = yield (0, jwt_1.verifyJWT)(accessToken);
    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    if (expired)
        throw new AccessTokenError_1.default();
    return next();
});
exports.default = deserializedToken;
//# sourceMappingURL=deserializedToken.js.map