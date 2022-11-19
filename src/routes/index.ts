import { Router, Application } from 'express'
import { HealthRouter } from './health.route'
import { ProductRouter } from './products.route'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter]
]

const routes = (app: Application): void => {
  _routes.forEach((route): void => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
