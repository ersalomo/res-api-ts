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
/* eslint-disable camelcase */
// import { v4 } from 'uuid';
// import UserTestHelper from './UserTestHelper';
const jwt_1 = require("../src/utils/jwt");
const hashing_1 = require("../src/utils/hashing");
const ServerTestHelper = {
    getAccessToken({ 
    // user_id = v4(),
    // name = 'Ersalomo',
    password = (0, hashing_1.hashing)('12345678'), role = 'user', email = 'user@gmail.com' }) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { email, role, password };
            // await UserTestHelper.addUser(payload)
            return (0, jwt_1.signJWT)(Object.assign({}, payload), { expiresIn: '1d' });
        });
    }
};
exports.default = ServerTestHelper;
//# sourceMappingURL=ServerTestHelper.js.map