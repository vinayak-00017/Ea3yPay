import { BASE_URL } from "@/config"
import axios from "axios"
import { useState } from "react"
import BottomPrompt from "@/components/signup/BottomPrompt"
import Button from "@/components/signup/Button"
import Heading from "@/components/signup/Heading"
import InputBox from "@/components/signup/InputBox"
import SubHeading from "@/components/signup/SubHeading"
import { useRouter } from "next/router"


export default  function Signin() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async() =>{
    try {
        const response = await axios.post(`${BASE_URL}/api/user/signin`,{
          email,
          password
        })
        router.push('/dashboard')
    }catch(err){
      console.error(err)
    }
  }

  const handleLogout = async() => {
    try{
      const response = await axios.post(`${BASE_URL}/api/user/logout`)
      console.log(response.data)
    }catch(err){
      console.error(err)
    }
  }

    return(
      <div className="flex justify-center">
        <div className="bg-neutral-800 rounded-lg w-1/4 m-8 p-10 flex flex-col  justify-center">
          <Heading label={"Sign In"}></Heading>
          <SubHeading label={"Enter your information to create an account"}></SubHeading>
          <InputBox type="email" label={"Email"} value={email} setValue={setEmail} placeholder={"ufc@195.com"}></InputBox>
          <InputBox type="password" label={"Password"} value={password} setValue={setPassword} placeholder={"*****"}></InputBox>
          <Button label={"Sign In"} handleClick={handleClick}></Button>
          <BottomPrompt label={"New user?"} buttonText="Sign Up" to="/signup"></BottomPrompt>
        </div>
      </div>
      
    )
}