import BottomPrompt from "@/components/signup/BottomPrompt"
import Button from "@/components/signup/Button"
import Heading from "@/components/signup/Heading"
import InputBox from "@/components/signup/InputBox"
import SubHeading from "@/components/signup/SubHeading"
import { BASE_URL } from "@/config"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"


export default  function Signup() {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName , setLastName] = useState('')

  const handleClick = async() =>{
    try {
        await axios.post(`${BASE_URL}/api/user/signup`,{
          email,
          password,
          firstName,
          lastName
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
        <div className="bg-neutral-800 rounded-lg m-8 p-10 flex flex-col  justify-center">
          <Heading label={"Sign Up"}></Heading>
          <SubHeading label={"Enter your information to create an account"}></SubHeading>
          <InputBox type="text" value={firstName} setValue={setFirstName} label={"First Name"} placeholder={"jon"}></InputBox>
          <InputBox type="text"  value={lastName} setValue={setLastName} label={"Last Name"} placeholder={"jones"}></InputBox>
          <InputBox type="email" value={email} setValue={setEmail} label={"Email"} placeholder={"ufc@195.com"}></InputBox>
          <InputBox type="password" value={password} setValue={setPassword} label={"Password"} placeholder={"*****"}></InputBox>
          <Button handleClick={handleClick} label={"Sign Up"}></Button>
          <BottomPrompt label={"Already have an account?"} buttonText="Sign In" to="/signin" ></BottomPrompt>
        </div>
      </div>

    )
}