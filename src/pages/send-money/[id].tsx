import IsUser from '@/components/IsUser';
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

function SendMoney(){

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
        return <div role="status" className='flex justify-center'>
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
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
            {!isPaymentDone && <div className="bg-slate-800 rounded-lg lg:w-1/4  m-4 p-10">
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


export default IsUser(SendMoney)