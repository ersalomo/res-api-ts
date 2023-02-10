"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    product_id: {
        type: String,
        unique: true
    },
    name: { type: String },
    price: { type: Number },
    size: { type: String },
    type: { type: String }
}, { timestamps: true });
exports.productModel = mongoose_1.default.model('products', productSchema);
//# sourceMappingURL=product.model.js.map