import mongoose from 'mongoose';
import config from '../config/environment'
import { logger } from './loggers'

const options: mongoose.ConnectOptions = {
  autoIndex: true,
  minPoolSize: config.db_min_pool_size,
  maxPoolSize: config.db_max_pool_size,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 45000
}

mongoose.connect(`${config.db}`, options)
// mongoose.createConnection(`${config.db}`)
  .then(() => {
    logger.info('Connecting to mongodb')
  }).catch((error:any) => {
    logger.error(`Err connect to mongodb: ${error.message}`)
    process.exit(1)
  })

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
  logger.info(`Mongoose default connection open to ${[]}`);
})

mongoose.connection.on('disconnected', () => {
  logger.info(`Mongoose default disconnected ${[]}`);
})

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
})
