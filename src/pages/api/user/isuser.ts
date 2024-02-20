import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie'
import { decrypt } from "@/middleware/auth";

export default async function IsUser(req: NextApiRequest, res: NextApiResponse){
    try{
        const session = cookie.parse(req.headers.cookie || '').auth
        if(!session) return res.status(440).json({message : 'session expired'});
        const decoded = await decrypt(session)
        if(decoded){
            return res.status(200).json({message : 'user authenticated'})
            // return res.json({decoded})
        }

        res.status(401).json({message : 'user not authenticated'})

    }catch(err){
        res.status(401).json({message : err})
    }
}