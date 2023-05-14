"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (exec) => (req, res, next) => {
    exec(req, res, next).catch(next);
};
//# sourceMappingURL=AsyncHandler.js.map