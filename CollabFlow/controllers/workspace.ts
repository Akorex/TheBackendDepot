import Workspace from "../models/workspace";
import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../utils/logger";
import { errorResponse, successResponse } from "../utils/responses";
import User from "../models/auth";
import { getBasicWorkspaceDetails } from "../utils/workspace";

export const createWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Create Workspace Service`)
        const {name, status, visibility, memberEmails} = req.body
        let userId = req.user?.userId // signedin user created the workspace

        // validate members
        const memberIds = await User.find({email: {$in: memberEmails}}).distinct('_id')

        if (!memberIds.includes(userId)){
            memberIds.push(userId)
        } //doesnt work as intended yet


        // create the workspace
        const workspace = await Workspace.create({
            name, 
            status,
            visibility,
            createdBy: userId, 
            members: memberIds
        })

        successResponse(
            res,
            StatusCodes.CREATED,
            "Successfully created workspace",
            getBasicWorkspaceDetails(workspace)
        )

        logger.info(`END: Create Workspace Service`)


    }catch(error){
        logger.error(`An error occured. Workspace not created ${error}`)
        next(error)
    }

}



export const getWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Get Workspace Service`)
        const workspaceId = req.params.id
        const userId = req.user?.userId

        const workspace = await Workspace.findOne({createdBy: userId, _id: workspaceId})

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
        logger.error(`An error occured. Could not fetch workspace ${error}`)
        next(error)
    }

}

export const getAllWorkspaces = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Get all Workspace Service`)
        const userId = req.user?.userId

        const workspaces = await Workspace.find({createdBy: userId}).sort('createdAt')

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
            errorResponse(res, StatusCodes.NOT_FOUND, `Could not find workspace`)
        }

        logger.info(`END: Get all workspace service`)

    }catch(error){
        logger.error(`An error occured, could not fetch workspace. ${error}`)
        next(error)
    }



}

export const deleteWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Delete Workspace Service`)
        let userId = req.user?.userId
        const workspaceId = req.params.id

        const workspace = await Workspace.findByIdAndDelete({_id: workspaceId, createdBy: userId})

        if (!workspace){
            errorResponse(
                res,
                StatusCodes.NOT_FOUND,
                `The workspace was not found`
            )
        }else{
             successResponse<null>(
                res,
                StatusCodes.OK,
                `Workspace deleted successfully`,
                null
            )

        }

        logger.info(`END: Delete Workspace Service`)
    }catch(error){
        logger.error(`An error occured in deleting workspace ${error}`)
        next(error)
    }

}

export const updateWorkspace = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // utilty to update workspace status or visibility
        logger.info(`START: Update Workspace Service`)
        const {visibility, status} = req.body
        const workspaceId = req.params.id

        const workspace = await Workspace.findByIdAndUpdate({_id: workspaceId}, {visibility: visibility, status: status},
            {new: true, runValidators: true})

        if (workspace){
            successResponse(
                res,
                StatusCodes.OK,
                `Workspace has been successfully updated`,
                getBasicWorkspaceDetails(workspace)
            )

        }else{
            errorResponse(
                res,
                StatusCodes.NOT_FOUND,
                `Workspace does not exist`
            )
        }

        logger.info(`END: Update Workspace Service`)

    }catch(error){
        logger.error(`An error occured in updating workspace ${error}`)
        next(error)
    }
    
}