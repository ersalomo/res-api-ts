import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

export const AuthRouter = Router()

AuthRouter.get('/users', AuthController.getUser)
AuthRouter.post('/register', AuthController.createUser)
