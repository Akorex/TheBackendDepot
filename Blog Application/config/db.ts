import mongoose from 'mongoose'

const connectDB = (url: any) => {
    return mongoose
    .connect(url)
    .then(() => console.log(`Connected to the database successfully.`))
    .catch((err) => console.log(`An error occured: ${err}`))
}

export default connectDB