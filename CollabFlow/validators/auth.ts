import Joi from "joi";
import {email, 
    password, 
    passwordConfirm,
    firstName,
    lastName, 
    passwordResetToken} from "./globalSchemas"


export const signupValidator = Joi.object({
    email,
    password,
    passwordConfirm,
    firstName,
    lastName
})

export const loginValidator = Joi.object({
    email,
    password
})

export const resetPasswordValidator = Joi.object({
    password,
    passwordResetToken
})