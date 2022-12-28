import bcrypt from 'bcrypt'

export function hashing(pwd: string) {
  return bcrypt.hashSync(pwd, 10)
}

export function checkPassword(pwd: string, hashedPassword: string) {
  return bcrypt.compareSync(pwd, hashedPassword)
}
