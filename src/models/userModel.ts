import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true, "First Name is required"]
    },
    lastName:{
        type:String,
        required:[true, "Last Name is required"]
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        unique:true,
        trim:true
    },
    phoneNumber:{
        type:String,
        required:[true, "Phone is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;