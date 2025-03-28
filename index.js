const express = require("express")
const mongoose = require("mongoose")
const User = require("./User")

const app = express()
const PORT = 8080

app.get("/users", async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.json({error: e})
    }
})

try {
    // Start the server and listen on the specified port
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

    //Connect to database
    mongoose.connect("mongodb://localhost:27017/ngos")
    console.log("Connected to database successfully!");

} catch (e){
    console.error(e);
}