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
    { enabled: false } // This disables the query from automatically running
    )

    const handleSearch = () =>{
        // Refetch the data when the search button is clicked
        refetch();
    }

    if(isLoading){
        return <div>Loading...</div>
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
                        <div className="flex justify-between mx-10">
                            <div className="flex">
                                <div className="flex items-center justify-center p-auto bg-zinc-800 w-14 h-14 rounded-full text-3xl">
                                    {user.firstName[0]}
                                </div>
                                <div className="flex justify-center items-center ml-2">
                                    {user.firstName}
                                </div>
                                <div className="flex justify-center items-center ml-1">
                                    {user.lastName}
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