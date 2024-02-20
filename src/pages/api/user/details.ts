import authenticate from "@/middleware/auth";
import User from "../../../db/models/userModel";
import { NextApiRequest, NextApiResponse } from "next";

const Details = async(req: NextApiRequest, res: NextApiResponse) => {
    const {id} = req.query;
    const user = await User.findById(id).select('-password')
    if(!user){
        return res.status(404).json({message : 'user not found'})
    }
    res.json(user)
}

export default authenticate(Details)