import { Router, Application } from 'express'
import { ProductRouter } from './products.route'
import { AuthRouter } from './auth.route'
import { CartRouter } from './cart.route'
import OrderRoute from './order.route';

type Route = [string, Router]

const _routes: Array<Route> = [
  ['/product', ProductRouter],
  ['/auth', AuthRouter],
  ['/cart', CartRouter],
  ['/order', OrderRoute],
]

const routes = (app: Application): void => {
  _routes.forEach((route: Route): void => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
