import { Router } from 'express'
import { createProduct, getProduct, detailProduct } from '../controllers/product.controller'

export const ProductRouter: Router = Router()

ProductRouter.get('/:name?', getProduct)
ProductRouter.get('/', getProduct)
ProductRouter.get('/:id', detailProduct)
ProductRouter.post('/', createProduct)
