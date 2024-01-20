import { Router } from "express";
import { registerUser,
     loginUser, 
     forgotPassword, 
     resetPassword, 
     deleteAccount,
     changePassword} from "../controllers/auth";

import isLoggedIn from "../middlewares/authentication"

import joiMiddleware from "../middlewares/joiMiddleware";
import { signupValidator,
          loginValidator, 
          resetPasswordValidator} from "../validators/auth";

const authRouter = Router()
authRouter.post('/register', joiMiddleware(signupValidator),registerUser)
authRouter.post('/login', joiMiddleware(loginValidator),loginUser)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', joiMiddleware(resetPasswordValidator), resetPassword)
authRouter.post('/delete-account', isLoggedIn, deleteAccount)
authRouter.post('/change-password', isLoggedIn, changePassword)

export default authRouter

