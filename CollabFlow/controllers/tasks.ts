import { NextFunction, Request, Response } from "express"
import Tasks from "../models/tasks"
import Workspace from "../models/workspace"
import User from "../models/auth"
import logger from '../utils/logger'
import {errorResponse, successResponse} from '../utils/responses'
import { StatusCodes } from "http-status-codes"
import { getBasicTaskDetails } from "../utils/tasks"


const confirmAccess = async (workspaceName: any, userId: any) => {
    // utility function to check if the workspace exists and users have access

    const workspace = await Workspace.findOne({
        name: workspaceName, 
        members: { $elemMatch: {$eq: userId}}
    })

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

export const getTask = async (req: Request, res: Response, next: NextFunction) => {
    try{

        logger.info(`START: Get Task Service`)
        const taskId = req.params.id

        const task = await Tasks.findById({_id: taskId})

        if (task){
            successResponse(res,
                StatusCodes.OK,
                `Successfully fetched Task`,
                getBasicTaskDetails(task))
        }else{
            errorResponse(
                res,
                StatusCodes.NOT_FOUND,
                `Task does not exist`
            )
        }

        logger.info(`END: Get Task Service`)
        
    }catch(error){
        logger.error(`Error occured in fetching task. ${error}`)
        next(error)
    }

}

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // returns all the tasks set by the user
        // tasks belong to a user if they are assigned to it
        logger.info(`START: Get All Tasks Service`)
        let userId = req.user?.userId

        const tasks = await Tasks.find({assigneeId: userId}).sort('createdAt')

        if (tasks && tasks.length > 0){
            const formattedTasks = tasks.map((tasks) => ({
                name: tasks.name,
                status: tasks.status
            }))

            
        successResponse(
            res,
            StatusCodes.OK,
            `Successfully fetched task`,
            formattedTasks
        )
    }else{
        errorResponse(
            res,
            StatusCodes.NOT_FOUND,
            `Could not find Tasks`
        )
    }


    }catch(error){
        logger.error(`An error occured in fetching tasks ${error}`)
        next(error)
    }

}





export const assignTask = (req: Request, res: Response, next: NextFunction) => {

}

export const deleteTask = (req: Request, res: Response, next: NextFunction) => {

}

export const updateTaskStatus = (req: Request, res: Response, next: NextFunction) => {

}


