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
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product.model");
const loggers_1 = require("../utils/loggers");
class ProductService {
    static getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.productModel
                .find()
                .then((data) => {
                return data;
            }).catch((error) => {
                loggers_1.logger.error(error);
            });
        });
    }
    static addProduct(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.productModel.create(payload);
        });
    }
    static findProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.productModel.findOne({ product_id: id });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.productModel.findOneAndUpdate({ product_id: id }, { $set: data });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.productModel.findOneAndDelete({ product_id: id });
        });
    }
}
exports.default = ProductService;
// Promise<ProductType[]>
//# sourceMappingURL=product.srv.js.map