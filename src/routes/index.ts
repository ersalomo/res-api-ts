import { Router, Application } from 'express'
import { HealthRouter } from './health'
import { ProductRouter } from './products'

const _routes: Array<[string, Router]> = [
  ['/health', HealthRouter],
  ['/product', ProductRouter]
]

const routes = (app: Application) => {
  _routes.forEach((route): void => {
    const [url, router] = route
    app.use(url, router)
  })
}

export default routes
