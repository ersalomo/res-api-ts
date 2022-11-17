import { Router, Response, Request, NextFunction } from 'express'

export const ProductRouter: Router = Router()

ProductRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    status: true,
    'status-code': 200,
    data: [
      {
        nama: 'Laptop Asus',
        price: 200_000,
        type: 'asuz 9002 A'
      },
      {
        nama: 'Laptop Acer',
        price: 250_000,
        type: 'asuz aspore 89X'
      }
    ]
  })
  next()
})
