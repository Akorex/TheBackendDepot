import { Router } from "express";
import { 
    createWorkspace,
    deleteWorkspace,
    getAllWorkspaces,
    getWorkspace, } from "../controllers/workspace"

import createWorkspaceValidator from "../validators/workspace"
import joiMiddleware from "../middlewares/joiMiddleware";

const workspaceRouter  = Router()

workspaceRouter.route('/').post(joiMiddleware(createWorkspaceValidator), createWorkspace).get(getAllWorkspaces)

workspaceRouter.route('/:id').get(getWorkspace).delete(deleteWorkspace)

export default workspaceRouter