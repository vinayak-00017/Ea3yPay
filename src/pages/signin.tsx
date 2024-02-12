import { BASE_URL } from "@/config"
import axios from "axios"
import { useState } from "react"


export default  function Signin() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleClick = async() =>{
    try {
        const response = await axios.post(`${BASE_URL}/api/user/signin`,{
          email,
          password
        })
        console.log(response.data)
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
        <div className="w-full max-w-xs ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4"></div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" 
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
              onClick={handleClick}
            >
              Sign In
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
              onClick={handleLogout}
            >
              Logout
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 . All rights reserved.
        </p>
      </div>
    )
}