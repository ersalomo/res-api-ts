import { Router } from 'express'
import { createProduct, getProduct } from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/:name?', getProduct)
ProductRouter.get('/', getProduct)
ProductRouter.post('/', createProduct)
