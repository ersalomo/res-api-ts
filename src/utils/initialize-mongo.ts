import mongoose from 'mongoose';
import { mongoUrl, options } from '../database/config/mongo-config'
import { logger } from './loggers'

export const initializeMongoDB = () => {
  mongoose.connect(mongoUrl, options)
  // mongoose.createConnection(`${config.db}`)
    .then(() => {
      logger.info('Connecting to mongodb')
    }).catch((error:any) => {
      logger.error(`Err connect to mongodb: ${error.message}`)
      process.exit(1)
    })

  // CONNECTION EVENTS
  mongoose.connection.on('connected', () => {
    logger.info(`[connected] Mongoose default connection open to ${[]}`);
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
}
