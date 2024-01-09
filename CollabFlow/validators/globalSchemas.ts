import Joi from "joi";

export const email = Joi.string().required().email().messages({
    "string.email": "Email address is invalid.",
    "any.required": "Email address is required."
})

export const password = Joi.string().required().min(6).messages({
    "string.min": "Password must contain at least 6 characters.",
    "any.required": "Password is required."
})

export const passwordResetToken = Joi.string().required().messages({
    "any.required": "Reset Token is needed for this"
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

export const workspaceName = Joi.string().required().max(20).messages({
    "string.max": "Workspace name must contain at most 20 characters",
    "any.required": "Workspace name is required"
})

export const workspaceVisibilty = Joi.string().valid('public', 'private', 'read-only').messages({
    "string.valid": "You have entered a wrong Workspace visibility status"
})

export const workspaceStatus = Joi.string().valid('new', 'active', 'closed').messages({
    "string.valid": "You have entered a wrong Workspace status"
})

export const taskName = Joi.string().required().max(20).messages({
    "any.required": "Task name is required",
    "string.max": "Task name must contain at most 20 characters"
})

export const taskStatus = Joi.string().valid('To do', 'Doing', 'Done').messages({
    "string.valid": "You have entered a wrong Task status"
})