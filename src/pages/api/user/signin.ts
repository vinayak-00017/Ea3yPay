import { NextApiRequest, NextApiResponse } from "next";
import bcrypt, { compare } from 'bcrypt';
import { connectToDatabase } from "../../../../db";
import User from "../../../../db/models/userModel";
import { SignJWT } from "jose";
import cookie from 'cookie'

const key = new TextEncoder().encode(process.env.USER_SECRET)


export const encrypt = async(payload:any) =>{
    return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1 hr from now')
    .sign(key)
}


export default async function Signin(req: NextApiRequest, res:NextApiResponse){
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

}

