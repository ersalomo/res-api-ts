"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _200_response_1 = __importDefault(require("./200.response"));
const _300_response_1 = __importDefault(require("./300.response"));
const _400_response_1 = __importDefault(require("./400.response"));
const _500_response_1 = __importDefault(require("./500.response"));
// declare module {}
exports.default = {
    SuccessResponse: _200_response_1.default,
    ChoiceResponse: _300_response_1.default,
    ErrorResponse: _400_response_1.default,
    FailureResponse: _500_response_1.default
};
//# sourceMappingURL=Response.response.js.map