// Charger les variables d'environnement à partir du fichier .env
require('dotenv').config();

const express = require("express")
const mongoose = require("mongoose")

const userRoutes = require("./routes/userRoutes")
const authRoutes = require("./routes/authRoutes")

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())

app.use("/users", userRoutes)
app.use("/auth", authRoutes)

try {
    // Start the server and listen on the specified port
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

    //Connect to database
    mongoose.connect(process.env.DB_URI)
    console.log("Connected to database successfully!");

} catch (e){
    console.error(e);
}