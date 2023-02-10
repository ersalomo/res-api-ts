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
const SuccessResponse_1 = __importDefault(require("../response/SuccessResponse"));
// import * as Res from '../response/Response.response'
// import { productModel } from '../models/product.model'
// import Controller from '../types/product-controller.types'
class ProductController {
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.product_id = (0, uuid_1.v4)();
            const { error, value } = (0, product_validation_1.createProductValidate)(req.body);
            if (error) {
                loggers_1.logger.error('Err: product-create', error.details[0].message);
                return res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: error.details[0].message
                });
            }
            try {
                yield product_srv_1.default.addProduct(value);
                return res.status(201).send(SuccessResponse_1.default.responseSuccess({
                    status: true,
                    statusCode: res.statusCode,
                    message: 'Product created successfully'
                }));
            }
            catch (err) {
                loggers_1.logger.error(`Error: ${err}`);
                loggers_1.logger.error(err);
                loggers_1.logger.info('Error createProduct', err);
                return res.status(422).send({
                    status: false,
                    statusCode: 422,
                    message: 'gagal menambah product'
                });
            }
        });
    }
    static getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_srv_1.default.getProducts();
            const { name, id } = req.params;
            let filteredProducts = products;
            // if (id) {
            //   const product = await this.detailProduct(id)
            //   if (product) {
            //     return res.status(200).send({
            //       status: true,
            //       statusCode: res.statusCode,
            //       data: product
            //     })
            //   }
            //   return res.status(404).send({
            //     status: false,
            //     statusCode: res.statusCode,
            //     message: 'Product not found'
            //   })
            // }
            if (name) {
                filteredProducts = products.filter((product) => {
                    return product.name.toLowerCase().includes(name.toLowerCase());
                });
                if (filteredProducts || filteredProducts.length < 1) {
                    return res.status(404).send({
                        status: false,
                        statusCode: 404,
                        data: []
                    });
                }
                return res.status(200).send({
                    status: false,
                    statusCode: 404,
                    data: filteredProducts
                });
            }
            return res.status(200).send({
                status: true,
                statusCode: res.statusCode,
                data: filteredProducts
            });
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
            try {
                // await updateProductById(id, value)
                yield product_srv_1.default.update(id, value);
                return res.status(200).send({
                    status: true,
                    statusCode: 200,
                    message: 'data berhasil diupdate',
                });
            }
            catch (err) {
                return res.status(500).send({});
            }
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
                    return res.status(404).send({
                        status: false,
                        statusCode: 404,
                        data: []
                    });
                }
            }
            return res.status(200).send({
                status: true,
                statusCode: res.statusCode,
                data: filteredProducts
            });
        });
    }
    static detailProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const result = yield product_srv_1.default.findProduct(id);
                if (result) {
                    return res.status(200).send({
                        status: true,
                        statusCode: res.statusCode,
                        data: result
                    });
                }
                return res.status(404).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: 'Product not found'
                });
            }
            catch (err) {
                loggers_1.logger.error(err);
                return false;
            }
        });
    }
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            loggers_1.logger.info('Delete Product...');
            try {
                const response = yield product_srv_1.default.delete(id);
                if (response) {
                    loggers_1.logger.info('Response Delete', response);
                    return res.status(200).send({
                        status: true,
                        statusCode: res.statusCode,
                        message: 'Product berhasil dihapus'
                    });
                }
                return res.status(422).send({
                    status: false,
                    statusCode: res.statusCode,
                    message: 'Product tidak ditemukan'
                });
            }
            catch (err) {
                loggers_1.logger.error(`Err: error delete product ${err}`);
                return false;
            }
        });
    }
}
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map