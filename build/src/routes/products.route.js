"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const auth_1 = require("../middleware/auth");
const AsyncHandler_1 = __importDefault(require("../helpers/AsyncHandler"));
exports.ProductRouter = (0, express_1.Router)();
// ProductRouter.use(AsyncHandler)
// ProductRouter.use('/', AuthMiddleware.requireUser)
exports.ProductRouter.get('/:name', (0, AsyncHandler_1.default)(product_controller_1.default.getProducts));
exports.ProductRouter.get('/', (0, AsyncHandler_1.default)(product_controller_1.default.getProducts));
// ProductRouter.get('/{name}', ProductController.getProduct)
exports.ProductRouter.get('/:id/detail', (0, AsyncHandler_1.default)(product_controller_1.default.detailProduct));
exports.ProductRouter.post('/', auth_1.AuthMiddleware.requireUser, auth_1.AuthMiddleware.requireAdmin, (0, AsyncHandler_1.default)(product_controller_1.default.createProduct));
exports.ProductRouter.put('/:id', (0, AsyncHandler_1.default)(product_controller_1.default.updateProduct));
exports.ProductRouter.delete('/:id', (0, AsyncHandler_1.default)(product_controller_1.default.deleteProduct));
//# sourceMappingURL=products.route.js.map