import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
const SignIn = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignInSubmit = async (e) =>{
        e.preventDefault();


        try{
            const response = await axios.post("https://todoappbackend-qqai.onrender.com/signin",{username,password})
            console.log(response)
            if(response.status === 200){
                const token = response.data.token
                localStorage.setItem("token",token)
                navigate('/todos')
                setUsername('')
                setPassword('')
            }
            else{
                console.log("Coudnlt sign in")
            }
 
        }catch(err){
            console.log(err)
        }

    }
    return(
        <>
            <form onSubmit={handleSignInSubmit}>
            <div className="container">
                <div className="h-container">
                     <h2 className="heading-2">Sign In</h2>
                </div>
                
            <div className="inp-container">
                <input onChange={handleUsernameChange}className="inp" type="text" placeholder="username"/>

                <input onChange={handlePasswordChange} className="inp" type = "password" placeholder="password"/>

            </div>

            
            <button className="btn">Submit</button>
            </div>

                
                
            </form>
        </>
    )
}

export default SignIn