const express = require("express")
const router = express.Router()
const { checkAuthentication, checkAuthorisation } = require("../middlewares/authMiddleware")
const {
    getUsersCount,
    getUserById,
    getUsers,
    updateUsername,
    deleteUser
} = require("../controllers/userController")

router.get("/counts", checkAuthentication, getUsersCount)

router.get("/", getUsers)

router.get("/:id", getUserById)

//Update username
router.put("/:id", checkAuthentication, checkAuthorisation, updateUsername)

router.delete("/:id", checkAuthentication, checkAuthorisation, deleteUser)

module.exports = router