import express, {Application, Request, Response} from 'express'
import {config} from './config/config'
import connectDB from './config/db'
import logger from './logger'
import notFoundMiddleWare from './middlewares/not-found'



// setup
const app: Application = express()
const port = config.port


// routes
app.get('/', (req: Request, res: Response) => {
    res.send('<h1> Welcome to my blog application </h1>')
})

// middlewares

app.use(notFoundMiddleWare)
app.use(express.json())

// start
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}. 
                    Press Ctrl-C to cancel.`)
        })
    }catch(err){
        logger.error(err)
    }
    
}

start()