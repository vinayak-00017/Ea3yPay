import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import { connectToDatabase } from "../../../../db";
import User from "../../../../db/models/userModel";
// import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import cookie from 'cookie'

const key = new TextEncoder().encode(process.env.USER_SECRET)


export const encrypt = async(payload:any) =>{
    return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1 hr from now')
    .sign(key)
}

export async function decrypt(input:string):Promise<any> {
   const {payload} = await jwtVerify(input,key,{
    algorithms:['HS256']
   })
   return payload
}



export default async function Signup(req: NextApiRequest, res:NextApiResponse){
    const {email, password} = req.body;
    await connectToDatabase();
    const user = await User.findOne({email})
    if(user){
        return res.status(403).json({message: 'User already exists'})
    }else{
        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({email, password:hashedPassword})
        newUser.save()
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
        res.json(session)
    }

}


// export async function getSession() {
//     const session = cookies().get('session')?.value
//     if(!session) return null;
//     return await decrypt(session)

// }