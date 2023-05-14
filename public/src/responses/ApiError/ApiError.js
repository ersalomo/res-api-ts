"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorType = void 0;
const AuthFailureResponse_1 = __importDefault(require("../ApiResponse/AuthFailureResponse "));
const AccessTokenErrorResponse_1 = __importDefault(require("../ApiResponse/AccessTokenErrorResponse "));
const InternalErrorResponse_1 = __importDefault(require("../ApiResponse/InternalErrorResponse "));
const NotFoundResponse_1 = __importDefault(require("../ApiResponse/NotFoundResponse "));
const BadRequestResponse_1 = __importDefault(require("../ApiResponse/BadRequestResponse "));
const ForbiddenResponse_1 = __importDefault(require("../ApiResponse/ForbiddenResponse "));
const environment_1 = __importDefault(require("../../config/environment"));
var ErrorType;
(function (ErrorType) {
    ErrorType["BAD_TOKEN"] = "BadTokenError";
    ErrorType["TOKEN_EXPIRED"] = "TokenExpiredError";
    ErrorType["UNAUTHORIZED"] = "AuthFailureError";
    ErrorType["ACCESS_TOKEN"] = "AccessTokenError";
    ErrorType["INTERNAL"] = "InternalError";
    ErrorType["NOT_FOUND"] = "NotFoundError";
    ErrorType["NO_ENTRY"] = "NoEntryError";
    ErrorType["NO_DATA"] = "NoDataError";
    ErrorType["BAD_REQUEST"] = "BadRequestError";
    ErrorType["FORBIDDEN"] = "ForbiddenError";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
class ApiError extends Error {
    constructor(type, message = 'error') {
        super(type);
        this.type = type;
        this.message = message;
    }
    /**
     * handle
    */
    static handle(err, res) {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new AuthFailureResponse_1.default(err.message).send(res);
            case ErrorType.ACCESS_TOKEN:
                return new AccessTokenErrorResponse_1.default(err.message).send(res);
            case ErrorType.INTERNAL:
                return new InternalErrorResponse_1.default(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new NotFoundResponse_1.default(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new BadRequestResponse_1.default(err.message).send(res);
            case ErrorType.FORBIDDEN:
                return new ForbiddenResponse_1.default(err.message).send(res);
            default: {
                let { message } = err;
                if (environment_1.default.is_dev) {
                    message = 'Something went wrong [dev]';
                }
                return new InternalErrorResponse_1.default(message).send(res);
            }
        }
    }
}
exports.default = ApiError;
//# sourceMappingURL=ApiError.js.map