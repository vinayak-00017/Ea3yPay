import { userDetails } from "@/common/zod";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../db/models/userModel";
import authenticate from "@/middleware/auth";
import bcrypt from 'bcrypt';

async function Upadte(req: NextApiRequest, res: NextApiResponse) {
    const parsedInput = userDetails.safeParse(req.body)
    if(!parsedInput.success){
        return res.status(411).json({message : parsedInput.error})
    }
    const id = req.headers["userId"]
    if(parsedInput.data.password){
        const hashedPassword = await bcrypt.hash(parsedInput.data.password,10)
        parsedInput.data.password = hashedPassword
    }
    const user = await User.findByIdAndUpdate(id,parsedInput.data,{new:true})
    if(!user){
        return res.status(404).json({message : 'user not found'})
    }
    res.json({message : 'user updated successfully'})
}

export default authenticate(Upadte)