import { Router } from 'express';
import AsyncHandler from '../helpers/AsyncHandler';
import CartController from '../http/controllers/cart.controller';
import { AuthMiddleware } from '../http/middleware/auth';

const CartRouter = Router();
const cartController = new CartController()

CartRouter.get('/', AsyncHandler(cartController.getCarts))
CartRouter.post('/:id', AsyncHandler(AuthMiddleware.requireUser, cartController.insertToCart))
CartRouter.put('/:id', AsyncHandler(AuthMiddleware.requireUser, cartController.updateCart))
CartRouter.delete('/:id', AsyncHandler(AuthMiddleware.requireUser, cartController.deleteCartUser))
CartRouter.get('/cart-user', AsyncHandler(AuthMiddleware.requireUser, cartController.getCartsUser))

export { CartRouter }
