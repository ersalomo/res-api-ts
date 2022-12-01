import { Router } from 'express'
import { createProduct, getProduct, detailProduct, updateProduct } from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/:name', getProduct)
ProductRouter.get('/', getProduct)
ProductRouter.get('/{name}', getProduct)
ProductRouter.get('/:id', detailProduct)
ProductRouter.post('/', createProduct)
ProductRouter.put('/:id', updateProduct)
