import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { connectToDatabase } from "../../../db";
import User from "../../../db/models/userModel";
import { SignJWT, jwtVerify } from "jose";
import cookie from 'cookie'
import { signupInput } from "@/common/zod";
import Account from "@/db/models/bankModel";

const key = new TextEncoder().encode(process.env.USER_SECRET)


export const encrypt = async(payload:any) =>{
    return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(key)
}


export default async function Signup(req: NextApiRequest, res:NextApiResponse){
    let parsedInput = signupInput.safeParse(req.body)
    if(!parsedInput.success){
        return res.status(411).json({
            message : parsedInput.error
        })
    }
    const email = parsedInput.data.email;
    await connectToDatabase();
    const user = await User.findOne({email})
    if(user){
        return res.status(403).json({message: 'User already exists'})
    }else{
        const hashedPassword = await bcrypt.hash(parsedInput.data.password,10)
        parsedInput.data.password = hashedPassword
        const newUser = new User(parsedInput.data)
        newUser.save()
        await Account.create({
            userId: newUser._id,
            balance: Math.floor(Math.random() * 1000000) + 1
        })
        const expires = new Date(Date.now() + 60*60*1000)
        const session = await encrypt({userId : newUser._id,expires})
        // const cookie = cookies().set('session',session,{expires,httpOnly:true})
        res.setHeader('Set-Cookie',cookie.serialize('auth', session, {
            httpOnly : true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite : 'strict',
            maxAge : 60 * 60,
            path : '/'
        }))
        res.json({message : 'user created' })
    }

}


// export async function getSession() {
//     const session = cookies().get('session')?.value
//     if(!session) return null;
//     return await decrypt(session)

// }