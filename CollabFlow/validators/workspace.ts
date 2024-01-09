import Joi from "joi"

import { 
    workspaceName,
    workspaceStatus,
    workspaceVisibilty
 } from "./globalSchemas"

const createWorkspaceValidator = Joi.object({
    name: workspaceName,
    status: workspaceStatus,
    visibility: workspaceVisibilty
 })

export default createWorkspaceValidator