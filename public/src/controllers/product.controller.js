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
const uuid_1 = require("uuid");
const product_validation_1 = require("../validations/product.validation");
const product_srv_1 = __importDefault(require("../services/product.srv"));
const loggers_1 = require("../utils/loggers");
const SuccessMsgResponse_1 = __importDefault(require("../responses/ApiResponse/SuccessMsgResponse "));
const SuccessResponse_1 = __importDefault(require("../responses/ApiResponse/SuccessResponse"));
const NotFoundResponse_1 = __importDefault(require("../responses/ApiResponse/NotFoundResponse "));
const BadPayloadRequest_1 = __importDefault(require("../responses/ApiResponse/BadPayloadRequest"));
class ProductController {
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.product_id = (0, uuid_1.v4)();
            const { error, value } = (0, product_validation_1.createProductValidate)(req.body);
            if (error) {
                loggers_1.logger.error('Err: product-create', error.details[0].message);
                return new BadPayloadRequest_1.default(error.details[0].message).send(res);
            }
            yield product_srv_1.default.addProduct(value);
            return new SuccessResponse_1.default('product created', value).send(res);
        });
    }
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_srv_1.default.getProducts();
            const { name } = req.params; // id?
            let filteredProducts = products;
            if (name) {
                loggers_1.logger.info(name);
                filteredProducts = products.filter((product) => {
                    return product.name.toLowerCase().includes(name.toLowerCase());
                });
                if (filteredProducts || filteredProducts.length < 1) {
                    return new NotFoundResponse_1.default();
                }
                return new SuccessResponse_1.default('success', filteredProducts).send(res);
            }
            return new SuccessResponse_1.default('success', products).send(res);
        });
    }
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { error, value } = (0, product_validation_1.createProductValidate)(req.body);
            if (error) {
                return res.status(422).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: error.details[0].message
                });
            }
            // await updateProductById(id, value)
            yield product_srv_1.default.update(id, value);
            return new SuccessMsgResponse_1.default('product updated').send(res);
        });
    }
    static getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_srv_1.default.getProducts();
            const { params: { name, id } } = req; // const { nama } = req.params
            let filteredProducts = products;
            loggers_1.logger.info(name, id);
            if (name) {
                filteredProducts = filteredProducts.filter((product) => {
                    var _a;
                    return (_a = product.name) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase().includes(name.toLocaleLowerCase());
                });
                if (filteredProducts || filteredProducts.length < 1) {
                    return new NotFoundResponse_1.default();
                }
            }
            return new SuccessResponse_1.default('success', filteredProducts).send(res);
        });
    }
    static detailProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const result = yield product_srv_1.default.findProduct(id);
            if (result) {
                return new SuccessResponse_1.default('success', result).send(res);
            }
            return res.status(404).send({
                status: false,
                statusCode: res.statusCode,
                message: 'Product not found'
            });
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            loggers_1.logger.info('Delete Product...');
            const response = yield product_srv_1.default.delete(id);
            if (response) {
                loggers_1.logger.info('Response Delete', response);
                return new SuccessMsgResponse_1.default('Product berhasil dihapus').send(res);
            }
            return res.status(422).send({
                status: false,
                statusCode: res.statusCode,
                message: 'Product tidak ditemukan'
            });
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map