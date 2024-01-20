import User from "../models/auth";
import { Request, Response, NextFunction } from "express";
import { successResponse, errorResponse } from "../utils/responses";
import logger from "../utils/logger";
import { StatusCodes } from "http-status-codes";
import {generateHashedValue, checkValidity, AuthResponseData, getBasicUserDetails} from '../utils/auth'
import ApiError from "../middlewares/errorHandler/api-error";
import { createAccessToken } from "../utils/auth";
import { generateRandomToken } from "../utils/auth";
import { resetTokenExpiresIn } from "../config/config";


export const registerUser = async (req: Request, res: Response, next: NextFunction) => {

    try{
        logger.info(`START: Register User Service`)
        const {email, 
            password, 
            firstName, 
            lastName,
            companyName,
            dateOfBirth, 
            about,
            } = req.body

        const existingUser = await User.findOne({email})
        if (existingUser){
            errorResponse(
                res,
                StatusCodes.BAD_REQUEST,
                `User already exists. Log in instead.`
            )
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: generateHashedValue(password),
            ...(companyName ? { companyName } : {}),
            ...(dateOfBirth ? {dateOfBirth}: {}),
            ...(about ? {about}: {}) // not clear about this, got idea from chatgpt
        })

        successResponse<AuthResponseData>(res, 
            StatusCodes.CREATED, 
            'Succesfully created user account',
            { user: getBasicUserDetails(newUser), jwt: createAccessToken(newUser._id)}
            )

        logger.info(`END: Register User Service`)

    }catch(error){
        logger.error(`Error in registering user`)
        next(error)
    }
    

}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Login User Service`)
        const {email, password} = req.body

        if (!email || !password) {
            errorResponse(
                res,
                StatusCodes.BAD_REQUEST,
                `Please provide your email and password.`
            )
        }

        const user = await User.findOne({email})

        if (!user){
            return next(ApiError.badRequest('This user does not exist.'))
        }

        if (!checkValidity(password, user.password)){
            return next(ApiError.badRequest("The email/password provided is not correct."))
        }

        successResponse<AuthResponseData>(res, 
            StatusCodes.OK, 
            "Successfully signed-in into account",
            {user: getBasicUserDetails(user), jwt: createAccessToken(user._id)})

        logger.info(`END: Login User Service`)

    }catch(error){
        logger.error(`Error in signing-in user`)
        next(error)
    }
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    // feature for the user to be able to forget password

    try{
        logger.info(`START: Forget Password Service`)
        const {email} = req.body

        // generate random token
        const resetToken = generateRandomToken() //undone

        const user = await User.findOneAndUpdate({email}, {
            passwordResetToken: resetToken,
            passwordResetExpires: new Date(Date.now() + resetTokenExpiresIn * 10000).toISOString() // 10 mins
        })

        if (!user){
            return next(ApiError.badRequest('This user does not exist in the database'))
        }

        /*publishEmail(
            req.body.email,
            "Reset your password",
            `Need a new password? No worries. Click the button below to reset and choose a new one.<br>
            <b>P.S:</b> The button below expires in ${resetTokenExpiresIn} minutes`,
            `${frontendBaseUrl}/reset-password?token=${resetToken}`,
            "Reset Password"
          );*/


        logger.info(`END: Forget Password Service`)
        successResponse<null>(
            res,
            StatusCodes.OK,
            `An email has been sent to ${req.body.email}. Follow the instructions to reset your password.`,
            null
        )

    }catch(error){
        logger.error(`Something went wrong.`)
        next(error)
    }

}

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Reset Password Service`)

        const {password, passwordResetToken} = req.body

        const user = await User.findOneAndUpdate({
            passwordResetToken: passwordResetToken,
            passwordResetExpires: {$gte : new Date().toISOString()}
        }, 
        
        {
            password: generateHashedValue(password),
            passwordChangedAt: new Date(),
            passwordResetToken: null, 
            passwordResetExpires: null,
        }).lean()

        if (!user){
            return next(ApiError.badRequest(`Invalid/Expired Password token`))
        }

        successResponse(res, StatusCodes.OK, 'Password reset successfully', user)
        logger.info(`END: Reset Password Service`)
    }catch(error){
        logger.error(`An issue occured with resetting password`)
        next(error)
    }



}

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: change password service`)
        const {user_id, password} = req.body

        if (!user_id){
            return next(ApiError.badRequest('Invalid user id'))
        }

        const user: any = await User.findByIdAndUpdate({_id: user_id}, {
            password: generateHashedValue(password)
        }, {new: true})

        successResponse<AuthResponseData>(
            res, 
            StatusCodes.ACCEPTED,
            'Password changed successfully', 
            {user: getBasicUserDetails(user), jwt: createAccessToken(user._id)})

        logger.info(`END: change password service`)
        
    }catch(error){
        logger.error(`Error in changing password`)
        next(error)
    }

}

export const deleteAccount = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info(`START: Deleting Account Service`)
        const user_id = String(req.body.user_id)

        if (!user_id){
            return next(ApiError.badRequest('Invalid user id'))
        }

        const deletedUser = await User.findByIdAndDelete({_id: user_id})
        logger.info(`END: Deleting Account Service`)
        return successResponse(res, StatusCodes.OK, 'Successfully deleted a user', deletedUser)

    }catch(error){
        next(error)
    }


}

