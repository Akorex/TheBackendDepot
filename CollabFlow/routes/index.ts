import { Router } from "express";
import authRouter from "./auth";
import workspaceRouter from './workspace'
import isLoggedIn from "../middlewares/authentication";

const router = Router()

router.use('/auth', authRouter)
router.use('/workspace', isLoggedIn, workspaceRouter)

export default router