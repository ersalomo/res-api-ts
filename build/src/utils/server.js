"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const deserializedToken_1 = __importDefault(require("../middleware/deserializedToken"));
const routes_1 = __importDefault(require("../routes"));
const ApiError_1 = __importStar(require("../responses/ApiError/ApiError"));
const loggers_1 = require("./loggers");
const environment_1 = __importDefault(require("../config/environment"));
const InternalError_1 = __importDefault(require("../responses/ApiError/InternalError "));
const NotFoundError_1 = __importDefault(require("../responses/ApiError/NotFoundError "));
process.on('uncaughtException', (err) => {
    loggers_1.logger.error(err);
});
const createServer = () => {
    const app = (0, express_1.default)();
    // parser body req
    app.use(express_1.default.json({ limit: '10mb' }));
    app.use(body_parser_1.default.urlencoded({ limit: '10mb', extended: false, parameterLimit: 5000 }));
    app.use(body_parser_1.default.json());
    // cors access handler
    app.use((0, cors_1.default)());
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '+');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    });
    app.use(deserializedToken_1.default);
    // catch 404 and foware to error handler
    (0, routes_1.default)(app);
    app.use((req, res, next) => next(new NotFoundError_1.default('Not Found Expception')));
    // eslint-disable-next-line consistent-return
    app.use((err, req, res, next) => {
        if (err instanceof ApiError_1.default) {
            ApiError_1.default.handle(err, res);
            if (err.type === ApiError_1.ErrorType.INTERNAL) {
                loggers_1.logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            }
        }
        else {
            loggers_1.logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        }
        if (environment_1.default.is_dev) {
            return res.status(500).send({
                message: 'Internal is under constructor development',
            });
        }
        ApiError_1.default.handle(new InternalError_1.default(), res);
        next();
    });
    return app;
};
exports.default = createServer;
//# sourceMappingURL=server.js.map