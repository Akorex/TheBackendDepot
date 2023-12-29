import User from "../models/auth";
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import logger from "../utils/logger";
import { StatusCodes } from "http-status-codes";
import {generateHashedValue, checkValidity} from '../utils/auth'
import ApiError from "../middlewares/errorHandler/api-error";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    try{
        logger.info(`START: Register User Service`)
        const {email, 
            password, 
            firstName, 
            lastName,
            companyName,
            dateOfBirth} = req.body

        const existingUser = await User.findOne({email})
        if (existingUser){
            res.status(StatusCodes.BAD_REQUEST).json({message: 'User already exists. Log in instead.'})
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: generateHashedValue(password),
            ...(companyName ? { companyName } : {}),
            ...(dateOfBirth ? {dateOfBirth}: {})
        })

        res.status(StatusCodes.CREATED).json({user: 
            {firstName: newUser.firstName, lastName: newUser.lastName, email: newUser.email}
        })

        logger.info(`END: Register User Service`)

    }catch(error){
        next(error)
    }
    

}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Login User Service`)
        const {email, password} = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Please provide your email and password.'))
        }

        const user = await User.findOne({email})

        if (!user){
            return next(ApiError.badRequest('This user does not exist.'))
        }

        if (!checkValidity(password, user.password)){
            return next(ApiError.badRequest("The email/password provided is not correct."))
        }

        logger.info(`END: Login User Service`)
        res.status(StatusCodes.OK).json({user: {name: `${user.firstName} ${user.lastName}`}})

    }catch(error){
        next(error)
    }
}

export const forgotPassword = async (req: Request, res: Response) => {

}

export const resetPassword = async (req: Request, res: Response) => {

}

export const changePassword = async (req: Request, res: Response) => {

}

export const deactivateAccount = async (req: Request, res: Response) => {

}

