import { transferInput } from "@/common/zod";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import Account from "../../../db/models/bankModel";
import authenticate from "@/middleware/auth";


const transfer = async(req: NextApiRequest,res: NextApiResponse) =>{
    const parsedInput = transferInput.safeParse(req.body)
    if(!parsedInput.success){
        return res.status(411).json(parsedInput.error)
    }
    parsedInput.data.amount *= 100;

    const session = await mongoose.startSession()
    session.startTransaction()


    const account = await Account.findOne({userId : req.headers['userId']}).session(session)

    if(!account || account.balance < parsedInput.data.amount){
        await session.abortTransaction()
        return res.status(400).json({
            message : 'insufficient balance'
        })
    }

    const toAccount = await Account.findOne({userId : parsedInput.data.to}).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message : 'Invalid account'
        })
    }

    await Account.updateOne({userId : req.headers['userId']},{
        $inc: {balance : -parsedInput.data.amount}
    }).session(session)

    await Account.updateOne({userId : parsedInput.data.to},{
        $inc : {balance : parsedInput.data.amount}
    }).session(session)

    await session.commitTransaction();
    res.json({
        message : 'Transfer sucessful'
    })
}

export default authenticate(transfer)