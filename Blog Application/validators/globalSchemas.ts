import Joi from "joi";

export const emailRegex = 
/^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export const phoneNumberRegex = /^[0-9]+$/;

export const email = Joi.string().required().email().messages({
    'string.email': 'email address is invalid',
    'any.required': 'email address is required'
})

export const name = Joi.string().required().messages({
    'any.required': 'Name is required'
})

export const password = Joi.string().required().min(8).messages({
    'string.min': "Password must contain at least 8 characters",
    'any.required': 'Password is required'
})

export const passwordConfirm = Joi
.string()
.required()
.valid(Joi.ref('password'))
.messages({
    'any.required': "Password confirm is required",
    'any.only': 'Passwords must match'
})