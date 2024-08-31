import express, { Application, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import rateLimit from 'express-rate-limit'



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

const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.status(200).send("<h1> Welcome to Autobots </h1>")
})

app.listen(port, () => {
    console.log(`server started listening at http://localhost:${port}`)
})