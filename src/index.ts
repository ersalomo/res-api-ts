import { logger } from './utils/loggers'
import './utils/connectDB'
import createServer from './utils/server'

const app = createServer()
const port: number = Number(process.env.PORT) || 4000

app.listen(port, () => {
  logger.info(`server listen on http://localhost:${port}`)
})

export default app;
