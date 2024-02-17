import {number, string, z} from 'zod'

export const signupInput = z.object({
    email : z.string().email(),
    password : z.string().min(1),
    firstName : z.string(),
    lastName : z.string()
})


export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(1)
})

export type SignupParams = z.infer<typeof signupInput>;


export const userDetails = z.object({
    email : z.string().email(),
    password : z.string().min(1),
    firstName : z.string(),
    lastName : z.string()
}).partial()


export const search = z.string()

export const transferInput = z.object({
    to : string(),
    amount: number()
})