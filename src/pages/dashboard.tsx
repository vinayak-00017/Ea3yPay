import Users from "@/components/Users";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useQuery } from "react-query";

export default function Dashboard(){

    const {data:balance , isLoading} = useQuery(['balance'],
    async() => {
        const response = await axios.get(`${BASE_URL}/api/account/balance`)
        return response.data.balance
    }
    )

    if(isLoading){
        return <div>
            Loading...
        </div>
    }

    return(
        <div className="px-10">
            <div className="flex">
                <h1 className="text-2xl font-bold">
                    Your Balance: 
                </h1>
                <h2 className="text-2xl font-semibold ml-2">
                    ${balance}
                </h2>
            </div>
            <Users></Users>
        </div>
    )
}