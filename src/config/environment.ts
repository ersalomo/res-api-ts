import 'dotenv/config'
import { readPublicKey, readPrivateKey } from '../helpers/ReadFile'

const CONFIG = {
  db: process.env.DB,
  is_dev: process.env.NODE_ENV === 'development',
  db_max_pool_size: Number(process.env.DB_MAX_POOL_SIZE) || 5,
  db_min_pool_size: Number(process.env.DB_MIN_POOL_SIZE) || 2,
  jwt_private_key: async () => await readPrivateKey(),
  jwt_public_key: async () => await readPublicKey(),

}

export default CONFIG
