"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashing = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
function hashing(pwd) {
    return bcrypt_1.default.hashSync(pwd, 10);
}
exports.hashing = hashing;
function checkPassword(pwd, hashedPassword) {
    return bcrypt_1.default.compareSync(pwd, hashedPassword);
}
exports.checkPassword = checkPassword;
//# sourceMappingURL=hashing.js.map