import {Router} from "express"
import {loginValidator, registrationValidator} from "../validators/jwt.validator.js"
import {signUp, signIn, account} from "../controllers/jwt.controller.js"
import {jwtMiddleware} from "../middleware/jwtAuth.js"
import {refreshMiddleware} from "../middleware/refreshMiddleware.js";

export const jwtRouter = Router()

jwtRouter.post("/register", registrationValidator, signUp)
jwtRouter.post("/login", loginValidator, signIn)
jwtRouter.post("/refresh", refreshMiddleware)
jwtRouter.get("/account", jwtMiddleware, account)

// jwt.get("/logout", logout)