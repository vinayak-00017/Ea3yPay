import { BASE_URL } from "@/config"
import axios from "axios"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { useQuery } from "react-query"


export default function IsUser(WrappedComponent : React.ComponentType<any>){
    return function (props:any) {
        const router = useRouter()
        const {data: user, isLoading} = useQuery('auth', 
        async() => {
            const response = await axios.get(`${BASE_URL}/api/user/isuser`)
            return response.data
        }
        )

        useEffect(()=>{
            if(!isLoading && !user){
                router.push('/signin')
            }
        },[isLoading,user])

        if(isLoading || !user){
            return <div>Loading...</div>
        }

        return <WrappedComponent {...props}/>
    }
}