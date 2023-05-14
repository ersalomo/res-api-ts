"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = __importDefault(require("../config/environment"));
const loggers_1 = require("./loggers");
const options = {
    autoIndex: true,
    minPoolSize: environment_1.default.db_min_pool_size,
    maxPoolSize: environment_1.default.db_max_pool_size,
    connectTimeoutMS: 60000,
    socketTimeoutMS: 45000
};
mongoose_1.default.connect(`${environment_1.default.db}`, options)
    // mongoose.createConnection(`${config.db}`)
    .then(() => {
    loggers_1.logger.info('Connecting to mongodb');
}).catch((error) => {
    loggers_1.logger.error(`Err connect to mongodb: ${error.message}`);
    process.exit(1);
});
// CONNECTION EVENTS
mongoose_1.default.connection.on('connected', () => {
    loggers_1.logger.info(`Mongoose default connection open to ${[]}`);
});
mongoose_1.default.connection.on('disconnected', () => {
    loggers_1.logger.info(`Mongoose default disconnected ${[]}`);
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose_1.default.connection.close(() => {
        loggers_1.logger.info('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});
//# sourceMappingURL=connectDB.js.map