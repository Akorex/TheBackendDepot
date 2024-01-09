import Joi from "joi"

import {
    taskName,
    taskStatus
} from './globalSchemas'


const createTaskValidator = Joi.object({
    name: taskName,
    status:taskStatus
})

export default createTaskValidator