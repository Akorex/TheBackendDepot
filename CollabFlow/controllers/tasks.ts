import { NextFunction, Request, Response } from "express"
import Tasks from "../models/tasks"
import Workspace from "../models/workspace"
import User from "../models/auth"
import logger from '../utils/logger'
import {errorResponse, successResponse} from '../utils/responses'
import { StatusCodes } from "http-status-codes"
import { getBasicTaskDetails } from "../utils/tasks"
import { fetchUserId } from "../utils/tasks"
import { confirmAccess } from "../utils/tasks"


export const createTask= async (req: Request, res: Response, next: NextFunction) => {
    try{

        // assigner is the logged-in user, can assign to himself or others in the same workspace
        // assignee is anyone existing in the same workspace.

        logger.info(`START: Create Task Service`)
        const {name, status, workspaceName, assigneeEmail} = req.body

        let assignerId = req.user?.userId       
        const assigneeId = await fetchUserId(assigneeEmail)
    

        // confirm that the assigner and assignee have access to the workspace
        const check = await confirmAccess(workspaceName, assignerId) && await confirmAccess(workspaceName, assigneeId)


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
        // code doesn't work as intended because issue with assigneeId
        logger.info(`START: Get All Tasks Service`)
        let userId = req.user?.userId

        const tasks = await Tasks.find({assigneeId: userId}).sort('createdAt')

        if (tasks && tasks.length > 0){
            const formattedTasks = tasks.map((tasks) => ({
                name: tasks.name,
                status: tasks.status
            }))

        logger.info(`END: Get All Tasks Service`)
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

        logger.info(`END: Get All Tasks Service`)
    }


    }catch(error){
        logger.error(`An error occured in fetching tasks ${error}`)
        next(error)
    }

}


export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Delete Task Service`)

        const task = await Tasks.findByIdAndDelete({_id: req.params.id})

        if (!task){
            errorResponse(
                res,
                StatusCodes.NOT_FOUND,
                `The Task was not found`
            )
        }else{
            successResponse<null>(
                res,
                StatusCodes.OK,
                `Task deleted successfully`,
                null
            )
        }

        logger.info(`END: Delete Task Service`)

    }catch(error){
        logger.error(`An error occured in deleting task ${error}`)
        next(error)
    }
}





export const assignTask = (req: Request, res: Response, next: NextFunction) => {

}



export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Update Task Status Service`)
        const {status} = req.body
        const taskId = req.params.id

        const task = await Tasks.findByIdAndUpdate({_id: taskId}, {status: status}, 
            {new: true, runValidators: true})

        if (task){
            successResponse(
                res,
                StatusCodes.OK,
                `Successfully updated task status`,
                getBasicTaskDetails(task)
            )
        }else{
            errorResponse(
                res,
                StatusCodes.NOT_FOUND,
                `Task does not exist`
            )

        }

        logger.info(`END: Update Task Status Service`)

    }catch(error){
        logger.error(`An error occured in updating task status {error}`)
        next(error)
    }

}


