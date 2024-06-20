class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if(err.name == "CastError"){
        const message = `Invalid Resources ${err.path}`
        err = new ErrorHandler(message, 400)
    }

    if(err.code == 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400)
    }

    if(err.name == "JsonWebTokenError"){
        const message = `Invalid token, please try again!`
        err = new ErrorHandler(message, 400)
    }

    if(err.name == "TokenExpiredError"){
        const message = `Token is Expired, please try again!`
        err = new ErrorHandler(message, 400)
    }

    const errMessage = err.errors ? Object.values(err.errors).map((curVal) => curVal.message).join(" ") : err.message

    return res.status(err.statusCode).json({
        success: false,
        message: errMessage
    })
}

export {ErrorHandler, errorMiddleware}