/* eslint-disable no-unused-vars */
import express from 'express'

type Handler = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
  ) => Promise<any>

export default (...middlewares : Handler[]) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const execMiddleware = async (index: number = 0) => {
    if (index === middlewares.length - 1) {
      await middlewares[index](req, res, next)
    } else {
      middlewares[index](req, res, async () => {
        await execMiddleware(index + 1)
      })
    }
  }
  execMiddleware().catch(next)
};
