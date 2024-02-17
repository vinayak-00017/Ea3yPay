import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie'
import { jwtVerify } from "jose";


const key = new TextEncoder().encode(process.env.USER_SECRET)

export async function decrypt(input:string):Promise<any> {
    const {payload} = await jwtVerify(input,key,{
     algorithms:['HS256']
    })
    return payload
 }


const authenticate = (fn: NextApiHandler) => async (
    req: NextApiRequest,
    res : NextApiResponse
) => {
    try{
        const session = cookie.parse(req.headers.cookie || '').auth
        if(!session) return res.status(440).json({message : 'session expired'});
        const decoded = await decrypt(session)
        if(decoded){
            req.headers['userId'] = decoded.userId
            return await fn(req,res)
            // return res.json({decoded})
        }

        res.status(401).json({message : 'you are not authenticated'})

    }catch(err){
        res.status(401).json({message : err})
    }
}

export default authenticate;