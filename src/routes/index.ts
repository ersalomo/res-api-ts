import { Router, Application } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './products.route'

type Route = [string, Router]

const _routes: Array<Route> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter]
]

const routes = (app: Application): void => {
  _routes.forEach((route: Route): void => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
