import express, { Application } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import routes from './routes'
import { logger } from './utils/loggers'

const app: Application = express()
const port: Number = 4_000
// parser body req
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// cors access handler
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '+')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})
routes(app)

app.listen(port, () => {
  logger.info(`server listen on ${port}`)
})
