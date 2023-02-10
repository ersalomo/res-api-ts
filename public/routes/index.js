"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_route_1 = require("./health.route");
const products_route_1 = require("./products.route");
const auth_route_1 = require("../routes/auth.route");
const _routes = [
    ['/health', health_route_1.HealthRouter],
    ['/product', products_route_1.ProductRouter],
    ['/auth', auth_route_1.AuthRouter],
];
const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route;
        app.use(url, router);
    });
};
exports.default = routes;
//# sourceMappingURL=index.js.map