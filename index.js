const express = require("express")
const mongoose = require("mongoose")

const app = express()
const PORT = 8080

try {
    // Start the server and listen on the specified port
    app.listen(PORT, () => console.log(`Server is running on ${PORT}`))

    //Connect to database
    mongoose.connect("mongodb://localhost:27017/ngos")
    console.log("Connected to database successfully!");
} catch (e){
    console.error(e);
}