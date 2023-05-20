import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../../utils/jwt';

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '');

  /**
   * return next() to procedd to nect middlware
   * and if statement is true the decoded crendential
   * is not set to next response
   * so it'll be handle by next middleware
   * dot not stop this middleware because it;s just for set decoded in ordet to
   * using for get authentication user
   */
  if (!accessToken) return next()
  const { decoded } = await verifyJWT(accessToken);

  if (!decoded) return next();
  res.locals.user = decoded;
  return next();
}

export default deserializedToken;
