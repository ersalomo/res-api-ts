"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const auth_1 = require("../middleware/auth");
exports.ProductRouter = (0, express_1.Router)();
exports.ProductRouter.get('/:name', product_controller_1.default.getProducts);
exports.ProductRouter.get('/', product_controller_1.default.getProducts);
// ProductRouter.get('/{name}', ProductController.getProduct)
exports.ProductRouter.get('/:id/detail', product_controller_1.default.detailProduct);
exports.ProductRouter.post('/', auth_1.AuthMiddleware.requireAdmin, auth_1.AuthMiddleware.requireUser, product_controller_1.default.createProduct);
exports.ProductRouter.put('/:id', product_controller_1.default.updateProduct);
exports.ProductRouter.delete('/:id', product_controller_1.default.deleteProduct);
//# sourceMappingURL=products.route.js.map