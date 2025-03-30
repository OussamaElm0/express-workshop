require("dotenv").config()
const jwt = require("jsonwebtoken")

const checkAuthUser = (req, res, next) => {
    const token = req.headers['authorization']
    if(token){
        const extractedToken = token.split(" ")[1]
        const  decodedToken = jwt.verify(extractedToken, process.env.SECRET_KEY)
        req.decodedToken = decodedToken
        next()

    } else {
        return res.status(401).json({
            error: "Token not found."
        })
    }
}

module.exports = checkAuthUser