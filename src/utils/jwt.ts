import jwt from 'jsonwebtoken';
import CONFIG from '../config/environment';
import AccessTokenError from '../responses/ApiError/AccessTokenError ';

export const signJWT = async (payload: Object, options?: jwt.SignOptions | undefined) => {
  const privateKey = CONFIG.PRIVATE_KEY || await CONFIG.jwt_private_key()
  if (!privateKey) throw new AccessTokenError('Missing private key')
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export const verifyJWT = async (token: string) => {
  const publicKey = CONFIG.PUBLIC_KEY || await CONFIG.jwt_public_key()
  const decoded = jwt.verify(token, publicKey);
  return {
    valid: true,
    expired: false,
    decoded
  }
}
