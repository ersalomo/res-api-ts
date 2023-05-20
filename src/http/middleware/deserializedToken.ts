import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../../utils/jwt';
import BadTokenError from '../responses/ApiError/BadTokenError';

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '');

  /**
  if (!accessToken) return new AccessTokenErrorResponse('error acces token deserialized').send(res)
  if (!accessToken) return next(new AccessTokenError())
  */

  if (!accessToken) return next()
  const { decoded } = await verifyJWT(accessToken);

  if (!decoded) return next(new BadTokenError());
  res.locals.user = decoded;
  return next();
}

export default deserializedToken;
