import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth';

export const AuthRouter = Router()
AuthRouter.post('/login', AuthController.createSession)
AuthRouter.post('/register', AuthController.createUser)
/**
 * user authenticated
*/
AuthRouter.use('/users', AuthMiddleware.requireUser)
AuthRouter.get('/users', AuthController.getUser)
AuthRouter.post('/users/refresh-token', AuthController.refreshSession,)
