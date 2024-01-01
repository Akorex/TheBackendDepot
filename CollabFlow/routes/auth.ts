import { Router } from "express";
import { registerUser,
     loginUser, 
     forgotPassword, 
     resetPassword, 
     deleteAccount,
     changePassword} from "../controllers/auth";

import joiMiddleware from "../middlewares/joiMiddleware";
import { signupValidator,
          loginValidator, 
          resetPasswordValidator} from "../validators/auth";

const authRouter = Router()
authRouter.post('/register', joiMiddleware(signupValidator),registerUser)
authRouter.post('/login', joiMiddleware(loginValidator),loginUser)
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password', joiMiddleware(resetPasswordValidator), resetPassword)
authRouter.post('/delete-account', deleteAccount)
authRouter.post('/change-password', changePassword)

export default authRouter

