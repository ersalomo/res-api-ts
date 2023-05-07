import jwt from 'jsonwebtoken';
import { logger } from './loggers';
import CONFIG from '../config/environment';

export const signJWT = async (payload: Object, options?: jwt.SignOptions | undefined) => {
  return jwt.sign(payload, await CONFIG.jwt_private_key(), {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export const verifyJWT = async (token: string) => {
  try {
    const decoded = jwt.verify(token, await CONFIG.jwt_public_key());
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    logger.error(`Err :[jwt] ${error}`);
    return {
      valid: true,
      expired: error.message === 'jwt is expired or not eligible to use',
      decoded: null,
    }
  }
}
