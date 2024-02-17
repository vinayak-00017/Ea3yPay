import mongoose, { Schema } from "mongoose";


const accountSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
})


export default mongoose.models.Account || mongoose.model('Account', accountSchema)