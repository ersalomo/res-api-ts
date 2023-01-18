import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middleware/auth';

export const AuthRouter = Router()

AuthRouter.get('/users', AuthMiddleware.requireUser, AuthController.getUser)
AuthRouter.post('/register', AuthController.createUser)
AuthRouter.post('/login', AuthController.createSession,)
