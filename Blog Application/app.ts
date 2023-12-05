import express, {Application, Request, Response} from 'express'
import {config} from './config/config'
import connectDB from './config/db'



// setup
const app: Application = express()
const port = config.port


// routes
app.get('/', (req: Request, res: Response) => {
    res.send('<h1> Welcome to my blog application </h1>')
})

// middlewares

// start
const start = () => {
    try{
        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}. 
                    Press Ctrl-C to cancel.`)
        })
    }catch(e){
        console.log(e)
    }
    
}

start()