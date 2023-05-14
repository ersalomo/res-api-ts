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
require("dotenv/config");
const ReadFile_1 = require("../helpers/ReadFile");
const CONFIG = {
    db: process.env.DB,
    is_dev: process.env.NODE_ENV === 'development',
    db_max_pool_size: Number(process.env.DB_MAX_POOL_SIZE) || 5,
    db_min_pool_size: Number(process.env.DB_MIN_POOL_SIZE) || 2,
    jwt_private_key: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, ReadFile_1.readPrivateKey)(); }),
    jwt_public_key: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, ReadFile_1.readPublicKey)(); }),
    PRIVATE_KEY: `${process.env.PRIVATE_KEY}`,
    PUBLIC_KEY: `${process.env.PUBLIC_KEY}`,
};
exports.default = CONFIG;
//# sourceMappingURL=environment.js.map