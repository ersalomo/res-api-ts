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
exports.readPrivateKey = exports.readPublicKey = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const util_1 = require("util");
function readPublicKey() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, '../../keys/public.pem'), 'utf-8');
    });
}
exports.readPublicKey = readPublicKey;
function readPrivateKey() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, util_1.promisify)(fs_1.readFile)(path_1.default.join(__dirname, '../../keys/private.pem'), 'utf-8');
    });
}
exports.readPrivateKey = readPrivateKey;
//# sourceMappingURL=ReadFile.js.map