import { NextApiRequest, NextApiResponse } from "next";
import Account from "../../../db/models/bankModel";
import authenticate from "@/middleware/auth";

const balance = async(req : NextApiRequest, res: NextApiResponse) =>{
    const userId = req.headers["userId"]
    const account = await Account.findOne({userId})
    if(!account){
        return res.status(404).json({message : 'user not found'})
    }
    res.json({balance : account.balance/100})
}

export default authenticate(balance)