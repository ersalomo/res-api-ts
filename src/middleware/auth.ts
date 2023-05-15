import { Request, Response, NextFunction } from 'express';
import ForbiddenResponse from '../responses/ApiResponse/ForbiddenResponse ';

export const AuthMiddleware = {
  async requireUser(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;

    if (!user) return new ForbiddenResponse('You don\'t have permission').send(res)
    return next()
  },

  async requireAdmin(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;

    if (!user || user._doc.role !== 'admin') return new ForbiddenResponse().send(res)
    return next()
  },
}
