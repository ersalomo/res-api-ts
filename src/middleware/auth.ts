import { Request, Response, NextFunction } from 'express';

export const AuthMiddleware = {
  requireUser(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;

    if (!user) {
      return res.sendStatus(403);
    }
    return next()
  },
  requireAdmin(req: Request, res: Response, next: NextFunction) {
    const { user } = res.locals;

    if (!user || user._doc.role !== 'admin') {
      return res.sendStatus(403);
    }
    return next()
  },
}
