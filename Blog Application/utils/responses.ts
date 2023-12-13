import {Response} from "express"

export const errorResponse = (
    res: Response,
    statusCode: number,
    error: string
): void => {
    res.status(statusCode).send({status: 'error', error})
}

// TO DO
//add success data

export const successResponse = (
    res: Response,
    statusCode: number,
    message: string
): void => {
    res.status(statusCode).send({status: "success", message})
}