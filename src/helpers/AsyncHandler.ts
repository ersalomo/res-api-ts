/* eslint-disable no-unused-vars */
import express from 'express'

type AsyncFunc = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
  ) => Promise<any>

// export default (exec: AsyncFunc) => (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   exec(req, res, next).catch(next)
// }

export default (...middlewares : AsyncFunc[]) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const execMiddleware = async (index: number = 0) => {
    if (index === middlewares.length) {
      await middlewares[index](req, res, next)
    } else {
      middlewares[index](req, res, async () => {
        await execMiddleware(index + 1)
      })
    }
  }
  execMiddleware().catch(next)
};
