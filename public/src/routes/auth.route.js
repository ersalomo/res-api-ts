"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
const AsyncHandler_1 = __importDefault(require("../helpers/AsyncHandler"));
exports.AuthRouter = (0, express_1.Router)();
// AuthRouter.use(AsyncHandler)
exports.AuthRouter.post('/login', (0, AsyncHandler_1.default)(auth_controller_1.AuthController.createSession));
exports.AuthRouter.post('/register', (0, AsyncHandler_1.default)(auth_controller_1.AuthController.createUser));
/**
 * user authenticated
*/
exports.AuthRouter.use('/users', auth_1.AuthMiddleware.requireUser);
exports.AuthRouter.get('/users', (0, AsyncHandler_1.default)(auth_controller_1.AuthController.getUser));
exports.AuthRouter.post('/users/refresh-token', (0, AsyncHandler_1.default)(auth_controller_1.AuthController.refreshSession));
//# sourceMappingURL=auth.route.js.map