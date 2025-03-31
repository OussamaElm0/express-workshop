require("dotenv").config()
const jwt = require("jsonwebtoken")

const checkAuthentication = (req, res, next) => {
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

const checkAuthorisation = (req, res, next) => {
    const token = req.headers['authorization']
    const secretKey = process.env.SECRET_KEY
    const extractedToken = token.split(" ")[1]    
    const { id } = req.params

    jwt.verify(extractedToken, secretKey, async (err, decoded) => {
        if (err) {
            return res.json({ error: 'Invalid token' });
        }
        if(decoded.userId == id){
            next()
        } else {
            return res.status(403).json({
                error: "Not authorized."
            })
        }
    });
}

module.exports = {
    checkAuthentication,
    checkAuthorisation
}