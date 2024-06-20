import User from "../models/userSchema.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import { ErrorHandler } from "../middlewares/ErrorMiddleware.js";
import cloudinary from "cloudinary";
import sendToken from "../utills/sendToken.js";

const register = catchAsyncError(async (req, res, next) => {
    
    if(!req.files || Object.keys(req.files).length == 0){
        return next(new ErrorHandler("Please provide user avatar", 400))
    }

    const {userAvatar} = req.files;
    const allowedFormats = ['image/png', 'image/webp', 'image/jpeg', 'image/jpg']
    if(!allowedFormats.includes(userAvatar.mimetype)){
        return next(new ErrorHandler("User avatar file type is invalid, only PNG,JPG and WEBP formats are allowed", 400))
    }

    const {name, email, number, password, education, role} = req.body;
    if( !name || !email || !number || !password || !education || !role ){
        return next(new ErrorHandler("Please fill full form", 400))
    }

    const cloudinaryResponse = await cloudinary.uploader.upload( userAvatar.tempFilePath )

    if(!cloudinaryResponse || cloudinaryResponse.error){
        return next(new ErrorHandler("Cloudinary Error", cloudinaryResponse.error || "Unknown Cloudinary Error"))
    }

    const user = await User.create({
        name,
        email,
        password,
        education,
        number,
        role,
        userAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    })

    sendToken(201, "Registered Successfully!", res, user)

})

const login = catchAsyncError(async(req, res, next) => {
    const {email, password, role} = req.body;

    if(!email, !password, !role){
        return next(new ErrorHandler("Please fill full form", 400))
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password"))
    }

    const isMatchPassword = await user.comparePassword(password)
    if(!isMatchPassword){
        return next(new ErrorHandler("Invalid email or password"))
    }

    if(role != user.role){
        return next(new ErrorHandler("Invalid user role"))
    }
    
    sendToken(200, "Logged In Successfully!", res, user)

})

const logout = catchAsyncError(async(req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).json({
        success: true,
        message: "Logged out successfully!!"
    })
})

const getAllAuthors = catchAsyncError(async(req, res, next) => {
    const authors = await User.find({role: "Author"})
    return res.status(200).json({
        success: true,
        authors
    })
})

const getUserDetails = catchAsyncError(async(req, res, next) => {
    const user = req.user
    return res.status(200).json({
        success: true,
        user
    })
})

export {register, login, logout, getAllAuthors, getUserDetails}
