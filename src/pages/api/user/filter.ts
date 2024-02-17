import { search } from "@/common/zod";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../db/models/userModel";
import authenticate from "@/middleware/auth";

async function Filter(req : NextApiRequest, res: NextApiResponse) {
    const filter = req.query.filter
    const parsedInput = search.safeParse(filter)
    if(!parsedInput.success){
        return res.status(411).json(parsedInput.error)
    }
    const users = await User.find({
        $or: [
            {firstName : {$regex:filter , $options: 'i'}},
            {lastName : {$regex:filter , $options: 'i'}}
        ]
    }).select('firstName lastName _id')
    if(!users){
        return res.status(404).json({message : 'user not found'})
    }
    res.json(users)
}

export default authenticate(Filter)