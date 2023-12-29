import Joi from "joi";

export const email = Joi.string().required().email().messages({
    "string.email": "Email address is invalid.",
    "any.required": "Email address is required."
})

export const password = Joi.string().required().min(6).messages({
    "string.min": "Password must contain at least 6 characters.",
    "any.required": "Password is required."
})

export const firstName = Joi.string().required().min(3).max(20).messages({
    "string.max": "Name must contain at most 20 characters.",
    "string.min": "Name must contain at least 3 characters.",
    "any.required": "Name is required."
})

export const lastName = Joi.string().required().min(3).max(20).messages({
    "string.max": "Name must contain at most 20 characters.",
    "string.min": "Name must contain at least 3 characters.",
    "any.required": "Name is required."
})

export const emailRegex =
  /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
export const phoneNumberRegex = /^[0-9]+$/;

export const passwordConfirm = Joi.string().required().valid(Joi.ref('password')).messages({
    "any.required": "Password confirm is required.",
    "any.only": "Password must match."

})