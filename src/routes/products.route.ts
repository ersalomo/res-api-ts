import { Router } from 'express'
import ProductController from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/:name', ProductController.getProducts)
ProductRouter.get('/', ProductController.getProducts)
// ProductRouter.get('/{name}', ProductController.getProduct)
ProductRouter.get('/:id/detail', ProductController.detailProduct)
ProductRouter.post('/', ProductController.createProduct)
ProductRouter.put('/:id', ProductController.updateProduct)
ProductRouter.delete('/:id', ProductController.deleteProduct)
