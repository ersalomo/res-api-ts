import { Router } from 'express';
import OrderController from '../http/controllers/order.controller';
import AsyncHandler from '../helpers/AsyncHandler';
import { AuthMiddleware } from '../http/middleware/auth';

const OrderRoute = Router()
const orderController = new OrderController()
OrderRoute.get('/', AsyncHandler(AuthMiddleware.requireUser, orderController.getUserOrder))
OrderRoute.post('/', AsyncHandler(AuthMiddleware.requireUser, orderController.createOrder))

export default OrderRoute
