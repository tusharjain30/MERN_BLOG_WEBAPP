const sendToken = async(statusCode, message, res, user) => {
    const token = user.generateToken()
    res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    }).json({
        success: true,
        message,
        user,
        token
    })
}

export default sendToken;