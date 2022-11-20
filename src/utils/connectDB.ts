import mongoose from 'mongoose';
import config from '../config/environment'
import { logger } from './loggers'

mongoose.connect(`${config.db}`)
  .then(() => {
    logger.info('Config to mongodb')
  }).catch((error:any) => {
    logger.error(`Err connect to mongodb: ${error.message}`)
    process.exit(1)
  })
