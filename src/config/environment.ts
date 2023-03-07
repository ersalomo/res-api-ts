import 'dotenv/config'

const CONFIG = {
  db: process.env.DB,
  jwt_private_key: `${process.env.PRIVATE_KEY}`,
  jwt_public_key: `${process.env.PUBLIC_KEY}`,
}

export default CONFIG
