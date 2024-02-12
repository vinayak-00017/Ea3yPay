import { NextApiRequest, NextApiResponse } from "next";
import cookie from 'cookie'

export default(req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader('Set-Cookie',
    cookie.serialize('auth',"",{
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path : '/'
    })
    )   
    res.json({message : 'user logged out'})
}