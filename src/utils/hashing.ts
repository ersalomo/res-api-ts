import bcrypt from 'bcrypt'

export default function hashing(pwd: string) {
  return bcrypt.hashSync(pwd, 10)
}
