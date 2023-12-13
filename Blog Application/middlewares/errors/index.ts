import ApiError from "./api-error"
import logger from "../../logger"
import {ErrorRequestHandler, Request, Response, NextFunction} from "express"
import {JsonWebTokenError} from "jsonwebtoken"
import { errorResponse } from "../../utils/responses"

const errorHandler = (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    let message = "Oops. Something went wrong. Please try again later"
    let errCode = 500

    if (err instanceof ApiError){
        message = err.message
        errCode = err.code
    } else if (err instanceof JsonWebTokenError){
        message = err.message
        errCode = 403
    } else if (err instanceof Error){
        message = err.message
        errCode = 422
    }else if (
        err instanceof SyntaxError ||
        err instanceof EvalError ||
        err instanceof RangeError ||
        err instanceof ReferenceError ||
        err instanceof TypeError ||
        err instanceof URIError
    ){
        message = err.message
        errCode = 400
    }

    logger.error(`[${req.method} ${req.url}] ${
        typeof message === 'string' ? message: JSON.stringify(message)
    }`)

    errorResponse(res, errCode, message)

}

export default errorHandler