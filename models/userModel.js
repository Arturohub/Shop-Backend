const mongoose = require("mongoose");

const usersSchema = mongoose.Schema(
    {
        name: {
            type: String, 
            required: true,
        },
        family_name: { 
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        mobile_number: {
            type: Number,
            required: true,
        },
        profile_picture: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true
    }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
