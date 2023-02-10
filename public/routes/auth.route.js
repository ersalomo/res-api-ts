"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_1 = require("../middleware/auth");
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.get('/users', auth_1.AuthMiddleware.requireUser, auth_controller_1.AuthController.getUser);
exports.AuthRouter.post('/register', auth_controller_1.AuthController.createUser);
exports.AuthRouter.post('/login', auth_controller_1.AuthController.createSession);
exports.AuthRouter.post('/refresh-token', auth_controller_1.AuthController.refreshSession);
//# sourceMappingURL=auth.route.js.map