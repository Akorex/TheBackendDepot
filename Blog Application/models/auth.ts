import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    
    email: {
        type: String,
        required: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true
    }, 

    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: [8, 'your password should be longer than six characters']
    }, 

    confirmPassword: {
        type: String,
        required: [true, 'please confirm your password'],
        minlength: [8, 'your password should be longer than six characters'],
    },

    phoneNumber: {
        type: String,
        required: false
    }


})

const User = mongoose.model('User', userSchema)

export default User