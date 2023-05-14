"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const ForbiddenResponse_1 = __importDefault(require("../responses/ApiResponse/ForbiddenResponse "));
exports.AuthMiddleware = {
    requireUser(req, res, next) {
        const { user } = res.locals;
        if (!user)
            return new ForbiddenResponse_1.default('You don\'t have permission').send(res);
        return next();
    },
    requireAdmin(req, res, next) {
        const { user } = res.locals;
        if (!user || user._doc.role !== 'admin')
            return new ForbiddenResponse_1.default().send(res);
        return next();
    },
};
//# sourceMappingURL=auth.js.map