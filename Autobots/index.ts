import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import router from './routes'
import { sqlConnection } from './config/db'



dotenv.config()

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Too many requests from this IP, please try again later.",
  });


const app:Application = express()





app.use(express.json())
app.use(limiter)
app.use(cors())
app.use("/", router)

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("<h1> Welcome to Autobots </h1>")
})

app.listen(port, async () => {
    try{
        await sqlConnection.getConnection().then((res) => console.log(`server started listening at http://localhost:${port}`))
        
    }catch(error){
        console.log(error)
    }
    
})