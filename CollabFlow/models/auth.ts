import mongoose from "mongoose";
import { TimeStamps, getTypeAndDefaultValue } from "../utils/auth";
import {Document, Model} from "mongoose"


export interface IUser extends Document, TimeStamps{
    firstName: string,
    lastName: string,
    email: string,
    about: string , 
    password: string,
    companyName: string | null,
    dateofBirth: Date | null,
    passwordResetToken: string | null;
    passwordResetExpires: Date | null | string;
    passwordChangedAt: Date | null;
}



const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },

    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },

    email: {
        type: String,
        required: [true, 'Email must be provided.'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
          ],
        unique: true
    },

    password: {
        type:String,
        required: [true, 'Please provide a password.'],
        minlength: [6, 'Your password should be longer than 6 characters.']
    },

    about: {
        type: String,
        required: false,
    },

    companyName: {
        type: String,
        required: false
    },

    dateOfBirth: {
        type: Date,
        required: false
    },

    passwordResetToken: getTypeAndDefaultValue(String, null),
    passwordChangedAt: getTypeAndDefaultValue(Date, null),
    passwordResetExpires: getTypeAndDefaultValue(Date, null)

}, 
{timestamps: true}

)

const User: Model<IUser>= mongoose.model('User', UserSchema)

//const User = mongoose.model('User', UserSchema)

export default User