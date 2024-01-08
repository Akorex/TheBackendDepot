import { Router } from "express";
import { 
    createWorkspace,
    getWorkspace, } from "../controllers/workspace"

const workspaceRouter  = Router()

workspaceRouter.route('/').post(createWorkspace)
workspaceRouter.route('/:id').get(getWorkspace)

export default workspaceRouter