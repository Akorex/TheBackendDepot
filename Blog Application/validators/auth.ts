import Joi from 'joi'
import {emailRegex, email, name, password, passwordConfirm} from './globalSchemas'


export const loginValidator = Joi.object({
    name,
    password
})

export const signupValidator = Joi.object({
    email,
    name,
    password,
    passwordConfirm
})