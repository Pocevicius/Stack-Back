const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    name:{type: String,required: true,min: 5},
    email:{type:String,
        lowercase: true,
        unique: true,
        required: [true, "Must enter Email"],
        match: [/\S+@\S+\.\S+/, "Email is invalid"],
    },
    password:{
        type:String,
        isLength: {
            options: [{ min: 6 }],
            errorMessage: "Must be at least 6 characters",
        }
    }
})
 module.exports = mongoose.model("User", userSchema);
