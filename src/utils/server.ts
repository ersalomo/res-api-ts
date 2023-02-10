import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import deserializedToken from '../middleware/deserializedToken'
import routes from '../routes';

const createServer = () => {
  const app: Application = express();
  // parser body req
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // cors access handler
  app.use(cors())
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '+')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })
  app.use(deserializedToken)
  routes(app)

  return app;
}

export default createServer;
