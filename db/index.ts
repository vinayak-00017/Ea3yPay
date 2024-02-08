import mongoose from "mongoose";

export const connectToDatabase = async() =>{
    try{
        await mongoose.connect(`mongodb://localhost:27017/PayPal`)
        console.log('Connected to MongoDB')
    }catch(err){
        console.error(err)
    }
}