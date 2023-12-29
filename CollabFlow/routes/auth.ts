import { Router } from "express";
import { registerUser,
     loginUser, 
     forgotPassword, 
     resetPassword } from "../controllers/auth";

import joiMiddleware from "../middlewares/joiMiddleware";
import { signupValidator,
          loginValidator } from "../validators/auth";

const authRouter = Router()
authRouter.post('/register', joiMiddleware(signupValidator),registerUser)
authRouter.post('/login', joiMiddleware(loginValidator),loginUser)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', resetPassword)

export default authRouter

