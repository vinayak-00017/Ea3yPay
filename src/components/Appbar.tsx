import { useRouter } from "next/router"
import Button from "./signup/Button"
import axios from "axios"
import { BASE_URL } from "@/config"
import IsUser from "./IsUser"

function Appbar(){

    const router = useRouter()

    const handleSignout = async() => {
        try{
          await axios.post(`${BASE_URL}/api/user/logout`)
          router.push('/signin')
        }catch(err){
          console.error(err)
        }
      }

    return(
        <div className="flex justify-between px-4 py-2">
            <div className="w-20 "
                onClick={() => router.push('/dashboard')}
            >
                <img 
                src='/pay.png'></img>
            </div>
            <div>
                <Button label="Sign Out" handleClick={handleSignout}></Button>
            </div>
        </div>
    )
}

export default IsUser(Appbar)