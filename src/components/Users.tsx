import { useQuery } from "react-query";
import SearchBox from "./SearchBox";
import axios from "axios";
import { BASE_URL } from "@/config";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Users(){

    const [search,setSearch] = useState("")
    const router = useRouter()


    const {data: users, isLoading,refetch} = useQuery(['users'], 
    async() => {
        const response = await axios.get(`${BASE_URL}/api/user/filter?filter=${search}`)
        return response.data
        },
    // { enabled: false } // This disables the query from automatically running
    )

    const handleSearch = () =>{
        // Refetch the data when the search button is clicked
        refetch();
    }

    if(isLoading){
        return <div role="status" className='flex justify-center'>
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
    }


    return (
        <div className="mt-6">
            <h2 className="font-bold text-xl">
                Users
            </h2>
            <SearchBox search={search} setSearch={setSearch} onSearch={handleSearch}></SearchBox>
            <div className="my-10">
                {users?.map((user: any)=>{
                    return (
                    <div key={user._id} className="my-6">
                        <div className="flex justify-between sm:mx-10">
                            <div className="flex">
                                <div className="flex items-center justify-center p-auto bg-zinc-800 w-14 h-14 rounded-full text-3xl">
                                    {user.firstName[0]}
                                </div>
                                <div className="ml-2">
                                    <div className="flex">
                                        <div className="flex justify-center items-center">
                                            {user.firstName}
                                        </div>
                                        <div className="flex items-center ml-1">
                                            {user.lastName}
                                        </div>
                                    </div>    
                                <div className="text-gray-400 text-sm">
                                    {user.email}
                                </div>     
                                </div>   
                            </div>
                            <div>
                                <button type="button" 
                                    onClick={()=>router.push(`/send-money/${user._id}`)}
                                    className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                                    Send Money
                                </button>
                            </div>
                        </div>
                        <hr className="my-2 mx-20"></hr>
                    </div>
                )})}
            </div>
            <div></div>
        </div>
    )
}