"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loggers_1 = require("./utils/loggers");
require("./utils/connectDB");
const server_1 = __importDefault(require("./utils/server"));
const app = (0, server_1.default)();
const port = Number(process.env.PORT) || 4000;
app.listen(port, () => {
    loggers_1.logger.info(`server listen on http://localhost:${port}`);
}).on('error', (e) => loggers_1.logger.error(e));
exports.default = app;
//# sourceMappingURL=index.js.map