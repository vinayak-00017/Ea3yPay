import mongoose, { Schema, model } from "mongoose";


const userSchema = new Schema({
    email : {type: String, required: true},
    password : {type: String, required : true},
    firstName : String,
    lastName : String
})


export default mongoose.models.User || mongoose.model('User', userSchema)