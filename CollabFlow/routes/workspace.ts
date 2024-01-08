import { Router } from "express";
import { 
    createWorkspace,
    getAllWorkspaces,
    getWorkspace, } from "../controllers/workspace"

const workspaceRouter  = Router()

workspaceRouter.route('/').post(createWorkspace).get(getAllWorkspaces)
workspaceRouter.route('/:id').get(getWorkspace)

export default workspaceRouter