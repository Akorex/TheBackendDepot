import Workspace from "../models/workspace";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";
import { errorResponse, successResponse } from "../utils/responses";
import User from "../models/auth";
import { getBasicWorkspaceDetails } from "../utils/workspace";

export const createWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {name, status, visibility, memberEmails} = req.body
        let createdBy = req.user?.userId

        // validate members
        const memberIds = await User.find({email: {$in: memberEmails}}).distinct('_id')

        if (!memberIds.includes(createdBy)){
            memberIds.push(createdBy)
        } //doesnt work as intended yet


        // create the workspace
        const workspace = await Workspace.create({
            name, 
            status,
            visibility,
            createdBy, 
            members: memberIds
        })

        successResponse(
            res,
            StatusCodes.OK,
            "Successfully created workspace",
            getBasicWorkspaceDetails(workspace)
        )


    }catch(error){
        logger.error(`Something went wrong. ${error}`)
        next(error)
    }

}



export const getWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Get Workspace Service`)
        const workspaceId = req.params.id
        const user = req.user?.userId

        const workspace = await Workspace.findOne({createdBy: user, _id: workspaceId})

        if (workspace){
            successResponse(
                res, 
                StatusCodes.OK, 
                'Sucessfully fetched workspace', 
                getBasicWorkspaceDetails(workspace))
        }else{
            errorResponse(res, StatusCodes.NOT_FOUND, 'Could not fetch workspace')
        }

        logger.info(`END: Get Workspace Service`)
        
    }catch(error){
        logger.error(`Something went wrong ${error}`)
        next(error)
    }

}

export const getAllWorkspaces = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Get all Workspace Service`)
        const user = req.user?.userId

        const workspaces = await Workspace.find({createdBy: user}).sort('createdAt')

        if (workspaces && workspaces.length > 0){
            const formattedWorkspaces = workspaces.map((workspaces) => ({
                name: workspaces.name,
                members: workspaces.members
            }))

            successResponse(
                res,
                StatusCodes.OK,
                `Successfully fetched workspaces`,
                formattedWorkspaces
            )
        }else{
            successResponse(
                res,
                StatusCodes.OK,
                `Successfully fetched workspaces`,
                workspaces
            ) // to do
        }

        logger.info(`END: Get all workspace service`)

    }catch(error){
        logger.error(`Something went wrong ${error}`)
        next(error)
    }



}

export const deleteWorkspace = async (req: Request, res: Response, next: NextFunction) => {

}

export const updateWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    
}