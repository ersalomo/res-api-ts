import { logger } from './utils/loggers'
import createServer from './server'
import { initializeMongoDB } from './utils/initialize-mongo'

initializeMongoDB()
const app = createServer()
const port: number = Number(process.env.PORT) || 4000

app.listen(port, () => {
  logger.info(`server listen on http://localhost:${port}`)
}).on('error', (e) => logger.error(e))

export default app;
