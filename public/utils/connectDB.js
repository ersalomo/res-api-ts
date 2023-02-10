"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = __importDefault(require("../config/environment"));
const loggers_1 = require("./loggers");
mongoose_1.default.connect(`${environment_1.default.db}`)
    .then(() => {
    loggers_1.logger.info('Config to mongodb');
}).catch((error) => {
    loggers_1.logger.error(`Err connect to mongodb: ${error.message}`);
    process.exit(1);
});
//# sourceMappingURL=connectDB.js.map