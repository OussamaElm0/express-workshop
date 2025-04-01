const mongoose = require("mongoose")

//Create the schema for user's model
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

//Create User's model from the schema
const User = mongoose.model('User', UserSchema)

module.exports = User