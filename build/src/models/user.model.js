"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const USER_DOCUMENT = 'users';
const userSchema = new mongoose_1.default.Schema({
    user_id: { type: String, unique: true },
    email: { type: String, unique: true },
    name: { type: String, default: '' },
    password: { type: String, default: '' },
    role: { type: String, default: 'regular' },
}, { timestamps: true });
exports.UserModel = mongoose_1.default.model(USER_DOCUMENT, userSchema);
//# sourceMappingURL=user.model.js.map