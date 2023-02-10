"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HealthRouter = void 0;
const express_1 = require("express");
exports.HealthRouter = (0, express_1.Router)();
exports.HealthRouter.get('/', (req, res, next) => {
    res.status(200).send({});
    next();
});
//# sourceMappingURL=health.route.js.map