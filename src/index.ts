import { logger } from './utils/loggers'
import './utils/connectDB'
import createServer from './server'

const app = createServer()
const port: number = Number(process.env.PORT) || 4000

app.listen(port, () => {
  logger.info(`server listen on http://localhost:${port}`)
}).on('error', (e) => logger.error(e))

export default app;
