import Workspace from "../models/workspace";
import ApiError from "../middlewares/errorHandler/api-error";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";
import { errorResponse, successResponse } from "../utils/responses";
import User from "../models/auth";

export const createWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, status, visibility, memberEmails} = req.body
        let createdBy = req.user?.userId

        // validate members
        const memberIds = await User.find({email: {$in: memberEmails}}).distinct('_id')

        // logged-in user is automatically a member
        memberIds.push(createdBy)

        // create the workspace

        const workspace = await Workspace.create({
            name, 
            status,
            visibility,
            createdBy, 
            members: memberIds
        })

        res.status(StatusCodes.OK).json({workspace: {name: workspace.name, status: workspace.status}})


    }catch(error){
        logger.error(`Something went wrong. ${error}`)
        next(error)
    }

}



export const getWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const workspaceId = req.params.id
        const user = req.user?.userId

        const workspace = await Workspace.findOne({createdBy: user, _id: workspaceId})

        if (workspace){
            successResponse(res, StatusCodes.OK, 'Sucessfully fetched workspace', workspace)
        }else{
            errorResponse(res, StatusCodes.NOT_FOUND, 'Could not fetch workspace')
        }
        
    }catch(error){
        logger.error(`Something went wrong ${error}`)
        next(error)
    }

}

export const getAllWorkspaces = async (req: Request, res: Response, next: NextFunction) => {

}

export const deleteWorkspace = async (req: Request, res: Response, next: NextFunction) => {

}

export const updateWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    
}