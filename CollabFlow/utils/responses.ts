import {Response} from "express";
import { AuthResponseData } from "./auth";

export const errorResponse = (
    res: Response,
    statusCode: number,
    error: string): void => {
        res.status(statusCode).send({status: 'error', error})
    }

export const successResponse = <AuthResponseData>(
    res: Response,
    statusCode: number,
    message: string, 
    data: AuthResponseData
): void => {
    res.status(statusCode).send({
        status: 'success', 
        message: message,
        data
    })
}