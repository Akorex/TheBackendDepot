import { NextFunction, Request, Response } from "express"
import ApiError from "./errorHandler/api-error"

const notFound = (req: Request, res: Response, next: NextFunction) => {
    next(ApiError.notFound())
}

export default notFound