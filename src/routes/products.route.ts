import { Router } from 'express'
import ProductController from '../http/controllers/product.controller'
import { AuthMiddleware } from '../http/middleware/auth'
import AsyncHandler from '../helpers/AsyncHandler'

export const ProductRouter: Router = Router()
// ProductRouter.use(AsyncHandler)
// ProductRouter.use('/', AuthMiddleware.requireUser)
ProductRouter.get('/:name', AsyncHandler(ProductController.getProducts))
ProductRouter.get('/', AsyncHandler(ProductController.getProducts))
// ProductRouter.get('/{name}', ProductController.getProduct)
ProductRouter.get('/:id/detail', AsyncHandler(ProductController.detailProduct))

ProductRouter.post(
  '/',
  AsyncHandler(
    AuthMiddleware.requireUser,
    AuthMiddleware.requireAdmin,
    ProductController.createProduct
  )
)

ProductRouter.put('/:id', AsyncHandler(ProductController.updateProduct))
ProductRouter.delete('/:id', AsyncHandler(ProductController.deleteProduct))
