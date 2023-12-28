import express, {Application, Request, Response} from 'express'
import { config } from './config/config'
import connectDB from './config/db'
import logger from './utils/logger'


// setup
const app: Application = express()
const port = config.port
const uri = config.uri

// middlewares
app.use(express.json())


// routes
app.get('/', (req: Request, res: Response) => {
    res.send(`<h1> Welcome to CollabFlow </h1>`)
})

const start = async () =>{
    try {
        await connectDB(uri)
        app.listen(port, () => {
            logger.info(`Server started. Listening on http://localhost:${port}
                            Press Ctrl-C to cancel`)
        })
    } catch (error) {
        logger.error(error)   
    }
}

start()

