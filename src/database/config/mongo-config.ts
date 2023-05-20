import mongoose from 'mongoose';
import config from '../../config/environment'

export const mongoUrl = `${config.db}`

export const options: mongoose.ConnectOptions = {
  autoIndex: true,
  minPoolSize: config.db_min_pool_size,
  maxPoolSize: config.db_max_pool_size,
  connectTimeoutMS: 60000,
  socketTimeoutMS: 45000
}
