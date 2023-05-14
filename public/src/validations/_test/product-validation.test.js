"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// import { createProductValidate, updateProductValidate } from '../product.validation';
const validator = __importStar(require("../product.validation"));
describe('product-validation test', () => {
    describe('Function createProductValidate', () => {
        it('should throw an error when payload dont meet specification', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const uuid = () => 'product-123'; // stub
            const payload = {
                product_id: uuid(),
                name: 'Product 123',
                price: 10000,
                type: '',
                size: 'XL'
            };
            // Act
            const { error } = validator.createProductValidate(payload);
            // Assert
            // eslint-disable-next-line no-useless-escape
            expect(error === null || error === void 0 ? void 0 : error.message).toBe('\"type\" is not allowed to be empty');
        }));
        it('should validate product payload correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const uuid = () => 'product-123'; // stub
            const payload = {
                product_id: uuid(),
                name: 'Product 123',
                price: 100000,
                type: 'product type',
                size: 'XL'
            };
            // Act
            const { value } = validator.createProductValidate({
                product_id: 'product-123',
                name: 'Product 123',
                price: 100000,
                type: 'product type',
                size: 'XL'
            });
            // Assert
            expect(value).toEqual(payload);
        }));
    });
    describe('Function updateProductValidate', () => {
        it('should validate product payload correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            // Arrange
            const uuid = () => 'product-123'; // stub
            const payload = {
                product_id: uuid(),
                name: 'Product 123',
                price: 100000,
                type: 'product type',
                size: 'XL'
            };
            // Act
            const { value } = validator.updateProductValidate({
                product_id: 'product-123',
                name: 'Product 123',
                price: 100000,
                type: 'product type',
                size: 'XL'
            });
            // Assert
            expect(value).toEqual(payload);
        }));
    });
});
//# sourceMappingURL=product-validation.test.js.map