import { Router } from 'express'
import ProductController from '../controllers/product.controller'
import { AuthMiddleware } from '../middleware/auth'
import AsyncHandler from '../helpers/AsyncHandler'

export const ProductRouter: Router = Router()
// ProductRouter.use('/', AuthMiddleware.requireUser)
ProductRouter.get('/:name', ProductController.getProducts)
ProductRouter.get('/', AsyncHandler(ProductController.getProducts))
// ProductRouter.get('/{name}', ProductController.getProduct)
ProductRouter.get('/:id/detail', ProductController.detailProduct)
ProductRouter.post('/', AuthMiddleware.requireAdmin, AuthMiddleware.requireUser, ProductController.createProduct)
ProductRouter.put('/:id', ProductController.updateProduct)
ProductRouter.delete('/:id', ProductController.deleteProduct)
