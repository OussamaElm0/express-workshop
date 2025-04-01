const express = require("express")
const router = express.Router()
const { checkAuthentication, checkAuthorisation } = require("../middlewares/authMiddleware")
const User = require("../models/User")

router.get("/counts", checkAuthentication, async (req, res) => {
    try {
        const usersCount = await User.countDocuments()

        return res.json({count: usersCount})
    } catch (e){
        return res.status(500).json({error: e.message})
    }
})

router.get("/", async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            users: users
        })
    } catch (e) {
        res.json({error: e.message})
    }
})

router.get("/:id", async (req, res) => {
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

//Update username
router.put("/:id", checkAuthentication, checkAuthorisation, async (req, res) => {
    try {
        const { username } = req.body
        const { id } = req.params

        const user = await User.updateOne(
            {
                _id: id
            },
            {
                username: username
            }
        )

        if(user.modifiedCount){
            return res.json({message: "User updated successfully!"})
        }
        return res.json({error: "An error occured during the update"})
    } catch (e){
        return res.status(500).json({error: e.message})
    }
})

router.delete("/:id", checkAuthentication, checkAuthorisation, async (req, res) => {
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

module.exports = router