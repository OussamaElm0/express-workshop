// Charger les variables d'environnement à partir du fichier .env
require('dotenv').config();

const express = require("express")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("./User")

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())

app.get("/users/counts", async (req, res) => {
    try {
        const usersCount = await User.countDocuments()

        return res.json({count: usersCount})
    } catch (e){
        return res.status(500).json({error: e.message})
    }
})

app.get("/users", async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            users: users
        })
    } catch (e) {
        res.json({error: e.message})
    }
})

app.get("/users/:id", async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findById(id)

        if(user){
            return res.json(user)
        }
        return res.status(404).json({error: "User not found"})
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
})

app.post("/auth/signup", async (req, res) => {
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
})

app.post("/auth/login", async (req, res) => {
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
})

//Update username
app.put("/users/:id", async (req, res) => {
    try {
        const { username } = req.body
        const { id } = req.params

        const user = await User.updateOne(
            {
                id
            },
            {
                username: username
            }
        )

        return res.json(user)
    } catch (e){
        return res.status(500).jsonn({error: e.message})
    }
})

app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params

        const user = await User.findByIdAndDelete(id)

        if (!user){
            return res.status(404).json({error: "User not found!"})
        }

        return res.json({success: "User deleted successfully!"})
    } catch (e) {
        return res.status(500).json({error: e.message})
    }
})

try {
    // Start the server and listen on the specified port
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

    //Connect to database
    mongoose.connect(process.env.DB_URI)
    console.log("Connected to database successfully!");

} catch (e){
    console.error(e);
}