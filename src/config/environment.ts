import 'dotenv/config'
import { readPublicKey, readPrivateKey } from '../helpers/ReadFile'

const CONFIG = {
  db: process.env.DB,
  jwt_private_key: async () => await readPrivateKey(),
  jwt_public_key: async () => await readPublicKey(),
  db_max_pool_size: Number(process.env.DB_MAX_POOL_SIZE) || 5,
  db_min_pool_size: Number(process.env.DB_MIN_POOL_SIZE) || 2,
  is_dev: process.env.NODE_ENV === 'development',
}

export default CONFIG
