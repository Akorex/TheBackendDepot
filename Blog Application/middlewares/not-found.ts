import { Request, Response } from "express";

const notFoundMiddleWare = (req: Request, res: Response) => {
    res.status(404).send('<h2> This page does not exist </h2>')
}

export default notFoundMiddleWare