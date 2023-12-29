import { Router } from "express";
import { registerUser,
     loginUser, 
     forgotPassword, 
     resetPassword } from "../controllers/auth";

const authRouter = Router()
authRouter.post('/register', registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)

export default authRouter