import { useRouter } from "next/router"
import IsUser from "./IsUser"

function Appbar(){

    const router = useRouter()

    return(
        <div className="flex justify-between px-4 py-4">
            <div className="w-20 "
                onClick={() => router.push('/dashboard')}
            >
                <img 
                src='/pay.png'></img>
            </div>
            <div>
                Hello
            </div>
        </div>
    )
}

export default IsUser(Appbar)