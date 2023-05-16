import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../../utils/jwt';
import AccessTokenError from '../../http/responses/ApiError/AccessTokenError ';
// import AccessTokenErrorResponse from '../responses/ApiResponse/AccessTokenErrorResponse ';

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '');

  /**
  if (!accessToken) return new AccessTokenErrorResponse('error acces token deserialized').send(res)
  if (!accessToken) return next(new AccessTokenError())
  */

  if (!accessToken) return next()
  const { decoded, expired } = await verifyJWT(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next()
  }
  if (expired) throw new AccessTokenError()

  return next();
}

export default deserializedToken;
