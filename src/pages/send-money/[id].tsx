import Button from '@/components/signup/Button';
import InputBox from '@/components/signup/InputBox';
import { BASE_URL } from '@/config';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

interface ErrorResponse {
    message: string;
}

export default function SendMoney(){

    const router = useRouter()
    const {id} = router.query
    const [amount, setAmount] = useState('')
    const [isPaymentDone, setIsPaymentDone] = useState(false)
    const [warning, setWarning] = useState(false)

    const handleClick = async () => {
        try{
            if(Number(amount)==0){
                return setWarning(true)
            }
            await transferMutation.mutateAsync(Number((amount)));
            setIsPaymentDone(true)
            setTimeout(()=>{
                router.push('/dashboard')
            },1000)
        }catch(err){
            console.error(err)
        }
    }


    const transferMutation = useMutation((amount: number) =>
    axios.post(`${BASE_URL}/api/account/transfer`, {
        to: id,
        amount: amount,
    })
);

    const {data : user, isLoading} = useQuery(['user'],
    async() => {
        const response = await axios.get(`${BASE_URL}/api/user/details?id=${id}`)
        return response.data
    }
    )

    if(isLoading){
        return <div>
            Loading...
        </div>
    }

    if (transferMutation.isError) {
        const axiosError = transferMutation.error as AxiosError<ErrorResponse>;
        return <div className='flex justify-center text-red-500 items-center flex-col'>
            Error: {axiosError?.response?.data.message}
            <Button label='Back to Dashboard' 
                    handleClick={()=>router.push('/dashboard')}
            ></Button>
        </div>;
}
    

    return (
        <div className='flex justify-center'>
            {!isPaymentDone && <div className="bg-slate-800 rounded-lg w-1/4 m-4 p-10">
                <h1 className='text-3xl font-bold flex items-center justify-center'>
                    Send Money
                </h1>
                <div className="flex mt-10 mb-5">
                    <div className="flex items-center justify-center p-auto bg-zinc-800 w-14 h-14 rounded-full text-3xl">
                         {user.firstName[0]}
                    </div>
                    <div className='ml-2 '>
                        <div className="flex justify-center items-center font-bold">
                            <div >
                                {user.firstName}
                            </div>
                            <div className=" ml-1">
                                {user.lastName}
                            </div>
                        </div>
                        <div className='text-sm text-gray-400'>
                            {user.email}
                        </div>
                    </div>
                    
                </div>
                <div>
                <div className="font-medium text-lg ">
                    Amount (in $)
                </div>
                <input value={amount} 
                        onChange={(e)=>setAmount(e.target.value)}
                        className="mb-4 w-full py-2 px-2 rounded-md bg-zinc-600 " 
                         placeholder= "Enter Amount"
                        type="number"
                ></input>
                {warning &&<div className='text-red-800'>
                        Enter a valid amount
                    </div>}
                </div>               
                    <Button label='Transfer' handleClick={handleClick}></Button>
                </div>}
           
            <div className='flex justify-center'>
                {isPaymentDone && 
                <div className="overlay animate-ping w-full h-full flex items-center justify-center">
                    <img className='rounded-full' 
                    src='/doneDark.png'></img>
                </div>}
            </div>   
            
        </div>
    )
}