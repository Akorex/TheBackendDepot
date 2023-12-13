import mongoose from 'mongoose'
import logger from '../logger'

const connectDB = (url: any) => {
    return mongoose
    .connect(url)
    .then(() => logger.info(`Connected to the database successfully.`))
    .catch((err) => logger.error(`Unable to connect to the database: ${err}`))
}

export default connectDB