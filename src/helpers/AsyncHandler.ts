/* eslint-disable no-unused-vars */
import express from 'express'

type AsyncFunc = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
  ) => Promise<any>

export default (exec: AsyncFunc) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  exec(req, res, next).catch(next)
}
