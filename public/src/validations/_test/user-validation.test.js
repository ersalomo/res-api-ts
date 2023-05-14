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
const user_validation_1 = require("../user.validation");
describe('user-validate', () => {
    it('it should validate the user payload correctly', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const uuid = () => 'user-123'; // stub
        const payload = {
            user_id: uuid(),
            email: 'user@example.com',
            name: 'user-123',
            password: 'password',
            role: 'user'
        };
        // Act
        const { value } = user_validation_1.UserValidate.createUserValidate(payload);
        // Assert
        expect(value).toEqual({
            user_id: 'user-123',
            email: 'user@example.com',
            name: 'user-123',
            password: 'password',
            role: 'user'
        });
    }));
});
//# sourceMappingURL=user-validation.test.js.map