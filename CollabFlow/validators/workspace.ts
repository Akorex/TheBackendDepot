import Joi from "joi"

import { 
    workspaceName,
    workspaceStatus,
    workspaceVisibilty
 } from "./globalSchemas"

const createWorkspaceValidator = Joi.object({
    name: workspaceName,
    status: workspaceStatus,
    visibility: workspaceVisibilty,
    //members: mongoIdArray()
 })

export default createWorkspaceValidator