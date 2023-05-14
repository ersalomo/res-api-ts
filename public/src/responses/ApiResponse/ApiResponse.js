"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseStatus = exports.StatusCode = void 0;
const loggers_1 = require("../../utils/loggers");
// Helper code for the API consumer to understand the error and handle is accordingly
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "10000";
    StatusCode["FAILURE"] = "10001";
    StatusCode["RETRY"] = "10002";
    StatusCode["INVALID_ACCESS_TOKEN"] = "10003";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["BAD_PAYLOAD"] = 422] = "BAD_PAYLOAD";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
class ApiResponse {
    constructor(statudCode, status, message) {
        this.statudCode = statudCode;
        this.status = status;
        this.message = message;
    }
    prepare(res, response, headers) {
        // for (const [ key, value ] of Object.entries(headers)) {
        //   res.append(key, value);
        // }
        Object.entries(headers).forEach((value) => {
            const [key, val] = value;
            loggers_1.logger.info(`Info [${value}]`);
            res.append(key, val);
        });
        return res.status(this.status).json(ApiResponse.sanitize(response));
    }
    send(res, headers = {}) {
        return this.prepare(res, this, headers);
    }
    static sanitize(response) {
        const clone = {};
        Object.assign(clone, response);
        // @ts-ignore
        // delete clone.status
        // for (const i in clone) {
        //   if (typeof clone[i] === 'undefined') delete clone[i];
        // }
        // Object.entries(clone).forEach((value) => {
        //   if (typeof value === 'undefined') delete clone[value];
        // })
        return clone;
    }
}
exports.default = ApiResponse;
//# sourceMappingURL=ApiResponse.js.map