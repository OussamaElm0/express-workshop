const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const signup =  async (req, res) => {
    try {
        const { username, email, password } = req.body
        const userExists = await User.findOne({email: email})

        if(userExists){
            return res.json({error: "User with this email already exists."})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        return res.json(user)
    } catch (e){
        return res.status(500).json({
            error: e.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if(!(email && password)){
            return res.json({
                error: "All fields are required"
            })
        }
        
        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(404).json({
                error: "User not found!"
            })
        }

        const passwordMatched = await bcrypt.compare(password, user.password)

        if(!passwordMatched){
            return res.json({
                error: "Password doesn't match!"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.SECRET_KEY)

        return res.json({token})
    } catch (e){
        return res.status(500).json({error: e.messge})
    }
}

module.exports = {
    signup,
    login
}