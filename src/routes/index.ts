import { Router, Application } from 'express'
import { ProductRouter } from './products.route'
import { AuthRouter } from '../routes/auth.route'

type Route = [string, Router]

const _routes: Array<Route> = [
  ['/product', ProductRouter],
  ['/auth', AuthRouter],
]

const routes = (app: Application): void => {
  _routes.forEach((route: Route): void => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
