import axios from "axios"
import { useState } from "react"

const SignUp = () =>{

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('') 

    const handleUsernameChange = (e) =>{
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) =>{
        setPassword(e.target.value)
    }

    const handleSignIn =  async (e) =>{
        e.preventDefault()

        try{
            const respone = await axios.post("http://localhost:3006/signup",{username,password})
            console.log(respone)
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
            <form onSubmit={handleSignIn}>
            <div className="container">
                <div className="h-container">
                     <h2 className="heading-2">Sign Up</h2>
                </div>
                
            <div className="inp-container">
                <input onChange ={handleUsernameChange}className="inp" type="text" placeholder="username"/>

                <input onChange={handlePasswordChange} className="inp" type = "text" placeholder="password"/>

            </div>

            
            <button className="btn">Submit</button>
            </div>

                
                
            </form>
        </>
    )
}

export default SignUp