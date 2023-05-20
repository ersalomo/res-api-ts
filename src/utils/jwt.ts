import jwt from 'jsonwebtoken';
import CONFIG from '../config/environment';
import { logger } from './loggers';
import InternalError from '../http/responses/ApiError/InternalError';
import BadTokenError from '../http/responses/ApiError/BadTokenError';

// encode
export const signJWT = async (payload: Object, options?: jwt.SignOptions | undefined) => {
  const privateKey = CONFIG.PRIVATE_KEY || await CONFIG.jwt_private_key()
  if (!privateKey) throw new InternalError('Token failure generate')
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export const verifyJWT = async (token: string) => { // decode
  try {
    const publicKey = CONFIG.PUBLIC_KEY || await CONFIG.jwt_public_key()
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error:any) {
    logger.error(`error: ${error.message}[] ${error.name}`) // throw new TokenExpiredError()
    return {
      valid: false,
      expired: true
    }
  }
}

export const decode = async (token: string) => {
  try {
    const publicKey = CONFIG.PUBLIC_KEY || await CONFIG.jwt_public_key()
    const decoded = jwt.verify(token, publicKey, {
      ignoreExpiration: true
    });
    return {
      valid: true,
      expired: false,
      decoded
    }
  } catch (error: any) {
    logger.error(`error: ${error.message} ${error.name}`) // throw new TokenExpiredError()
    throw new BadTokenError('Token error');
  }
}
