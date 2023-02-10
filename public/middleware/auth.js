"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
exports.AuthMiddleware = {
    requireUser(req, res, next) {
        const { user } = res.locals;
        if (!user) {
            return res.sendStatus(403);
        }
        return next();
    },
    requireAdmin(req, res, next) {
        const { user } = res.locals;
        if (!user || user._doc.role !== 'admin') {
            return res.sendStatus(403);
        }
        return next();
    },
};
//# sourceMappingURL=auth.js.map