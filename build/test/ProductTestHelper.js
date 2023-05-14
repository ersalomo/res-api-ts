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
const product_srv_1 = __importDefault(require("../src/services/product.srv"));
const ProductTestHelper = {
    addProduct(product = {
        product_id: (0, uuid_1.v4)(),
        name: 'New Name Product',
        price: 100000,
        type: 'product dewasa',
        size: 'XL'
    }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_srv_1.default.addProduct(product);
        });
    },
    findProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_srv_1.default.findProduct(id);
        });
    },
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_srv_1.default.delete(id);
        });
    },
};
exports.default = ProductTestHelper;
//# sourceMappingURL=ProductTestHelper.js.map