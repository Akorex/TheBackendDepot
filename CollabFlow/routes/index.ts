import { Router } from "express";
import authRouter from "./auth";
import workspaceRouter from './workspace'
import isLoggedIn from "../middlewares/authentication";
import taskRouter from "./tasks";

const router = Router()

router.use('/auth', authRouter)
router.use('/workspace', isLoggedIn, workspaceRouter)
router.use('/task', isLoggedIn, taskRouter)

export default router