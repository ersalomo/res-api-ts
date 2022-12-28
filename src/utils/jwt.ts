import jwt from 'jsonwebtoken';
import CONFIG from '../config/environment';
import { logger } from './loggers';

export const signJWT = (payload: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(payload, CONFIG.jwt_private_key, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, CONFIG.jwt_public_key);

    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    logger.error('Err : ', error);
    return {
      valid: true,
      expired: error.message === 'jwt is expired or not eligible to use',
      decoded: null,
    }
  }
}
