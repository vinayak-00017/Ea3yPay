import { NextApiRequest, NextApiResponse } from "next";
import  { compare } from 'bcrypt';
import { connectToDatabase } from "../../../db";
import User from "../../../db/models/userModel";
import cookie from 'cookie'
import { encrypt } from "./signup";



export default async function Signin(req: NextApiRequest, res:NextApiResponse){
    try{
        const {email, password} = req.body;
        await connectToDatabase();
        const user = await User.findOne({email})
        if(user){
            compare(password, user.password ,async function(err,result){
                if(!err && result){
                    const expires = new Date(Date.now() + 60*60*1000)
                    const session = await encrypt({userId : user._id,expires})
                    res.setHeader('Set-Cookie',cookie.serialize('auth', session, {
                        httpOnly : true,
                        secure: process.env.NODE_ENV !== 'development',
                        sameSite : 'strict',
                        maxAge : 60 * 60,
                        path : '/'
                    }))
                    res.json(session)
                }
                return res.status(403).json({message : 'Invalid credentials'})
            })
            
        }else{
            return res.status(403).json({message: 'User not found'})      
        }
    }catch(err){
        res.status(500).json({error: err})
    }

}

