import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth';
import AsyncHandler from '../helpers/AsyncHandler';

export const AuthRouter = Router()
// AuthRouter.use(AsyncHandler)
AuthRouter.post('/login', AsyncHandler(AuthController.createSession))
AuthRouter.post('/register', AsyncHandler(AuthController.createUser))
/**
 * user authenticated
*/
AuthRouter.use('/users', AuthMiddleware.requireUser)
AuthRouter.get('/users', AsyncHandler(AuthController.getUser))
AuthRouter.post('/users/refresh-token', AsyncHandler(AuthController.refreshSession),)
