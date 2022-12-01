import { Router } from 'express'
import ProductController from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/:name', ProductController.getProducts)
// ProductRouter.get('/', ProductController.getProduct)
// ProductRouter.get('/{name}', ProductController.getProduct)
// ProductRouter.get('/:id', ProductController.detailProduct)
ProductRouter.post('/', ProductController.createProduct)
ProductRouter.put('/:id', ProductController.updateProduct)
