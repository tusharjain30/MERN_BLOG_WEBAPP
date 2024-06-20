import { ErrorHandler } from "./ErrorMiddleware.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const isAuthenticated = catchAsyncError(async(req, res, next) => {
    const {token} = req.cookies;
    if(!token){
        return next(new ErrorHandler("User is not Authenticated", 400))
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = await User.findById(decode.id) 

    next();
})

export const isAuthorized = (...role) => {
    return (req, res, next) => {
        if(!role.includes(req.user.role)){
            return new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 400)
        }

        next()
    }
}

export default isAuthenticated