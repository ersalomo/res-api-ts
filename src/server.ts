import express, { Application, Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import deserializedToken from './http/middleware/deserializedToken'
import routes from './routes';
import ApiError, { ErrorType } from './http/responses/ApiError/ApiError';
import { logger } from './utils/loggers';
import CONFIG from './config/environment';
import InternalError from './http/responses/ApiError/InternalError';
import NotFoundResponse from './http/responses/ApiResponse/NotFoundResponse';
import AsyncHandler from './helpers/AsyncHandler';

process.on('uncaughtException', (err) => {
  logger.error(`'Error =>'  ${err}`)
})
const createServer = () => {
  const app: Application = express();
  // parser body req
  app.use(express.json({ limit: '10mb' }))
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: false, parameterLimit: 5000 }))
  app.use(bodyParser.json())

  // cors access handler
  app.use(cors())
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '+')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    next()
  })
  app.use(AsyncHandler(deserializedToken))
  // catch 404 and foware to error handler
  routes(app)
  app.use((req, res, next) => next(new NotFoundResponse('Not Found').send(res)))

  // eslint-disable-next-line consistent-return
  app.use((err: Error, req: Request, res: Response, next:NextFunction) => {
    if (err instanceof ApiError) {
      ApiError.handle(err, res);
      if (err.type === ErrorType.INTERNAL) {
        logger.error(
          `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
        )
      }
    } else {
      logger.error(`500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
    }
    if (CONFIG.is_dev) {
      return res.status(500).send({
        message: 'Internal is under constructor development',
      })
    }
    ApiError.handle(new InternalError(), res)
    next()
  })
  return app;
}

export default createServer;
