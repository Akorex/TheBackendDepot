import { NextFunction, Request, Response } from "express"
import Tasks from "../models/tasks"
import Workspace from "../models/workspace"
import User from "../models/auth"
import logger from '../utils/logger'
import {errorResponse, successResponse} from '../utils/responses'
import { StatusCodes } from "http-status-codes"


const confirmAccess = async (workspaceName: any, userId: any) => {
    // utility function to check if the workspace exists and users have access

    const workspace = await Workspace.findOne({name: workspaceName, members: { $in: [userId]}})
    return !!workspace 

}

export const createTask= async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Create Task Service`)
        const {name, workspaceName, status, assigneeId} = req.body

        // assigner is the logged-in user, can assign to himself or others in the same workspace
        let assignerId = req.user?.userId 

        // confirm that the assigner and assignee have access to the workspace
        const check = await confirmAccess(workspaceName, assignerId) && confirmAccess(workspaceName, assigneeId)

        if (check){
            const newTask = await Tasks.create({
                name,
                assignerId,
                assigneeId,
                status
            })

            successResponse(
                res, 
                StatusCodes.CREATED,
                `New Task successfully created`,
                newTask
            )


        }else{
            // error raised if check flag is falsity
            errorResponse(res, StatusCodes.BAD_REQUEST, 'An error occured. Confirm you have access to the workspace.')
        }

        logger.info(`END: Create Task Service`)


    }catch(error){
        logger.error(`Error occured in creating task. ${error}`)
        next(error)
    }

}

export const assignTask = (req: Request, res: Response, next: NextFunction) => {

}

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {

}

export const updateTaskStatus = (req: Request, res: Response, next: NextFunction) => {

}

export const getTask = (req: Request, res: Response, next: NextFunction) => {

}

export const getAllTasks = (req: Request, res: Response, next: NextFunction) => {

}