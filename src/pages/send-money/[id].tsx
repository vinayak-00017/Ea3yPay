import { useRouter } from 'next/router';
import React from 'react';

export default function SendMoney(){

    const router = useRouter()
    const {id} = router.query

    return (
        <div className='flex justify-center bg-slate-800'>
            <div className="bg-slate-800 rounded-lg w-1/4 m-8 p-10 flex flex-col  justify-center">

            </div>
            <h1>
                Send Money
            </h1>
            {id}
        </div>
    )
}