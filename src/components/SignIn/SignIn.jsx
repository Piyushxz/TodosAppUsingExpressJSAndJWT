import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
const SignIn = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignInSubmit = async (e) =>{
        e.preventDefault();


        try{
            const response = await axios.post("https://todoappbackend-qqai.onrender.com/signin",{email,password})
            console.log(response)
            if(response.status === 200){
                const token = response.data.token
                localStorage.setItem("token",token)
                navigate('/todos')
                setEmail('')
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
                <input onChange={handleEmailChange}className="inp" type="email" placeholder="email"/>

                <input onChange={handlePasswordChange} className="inp" type = "password" placeholder="password"/>

            </div>

            
            <button className="btn">Submit</button>
            </div>

                
                
            </form>
        </>
    )
}

export default SignIn