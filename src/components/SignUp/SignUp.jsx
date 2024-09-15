import axios from "axios";
import { useState } from "react";
import { useModal } from "../../context/modal-context";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userAlreadyFound, setUserAlreadyFound] = useState(false);
    const {isSignInModalOpen,modalDispatch} = useModal()
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log(username, password);
        try {
            const response = await axios.post("https://todoappbackend-qqai.onrender.com/signup", { email,username, password });
            console.log(response);
            if (response.status === 409) {
                console.log("User already found");
                setUserAlreadyFound(true);
                return;
            } else {
                setEmail('');
                setUsername('');
                setPassword('');
                setUserAlreadyFound(false);

                modalDispatch({
                    type:"OPEN_SIGNIN_MODAL"
                })
            }
        } catch (err) {
            console.error('Error:', err);
            if (err.response && err.response.status === 409) {
                setUserAlreadyFound(true);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleSignIn}>
                <div className="container">
                    <div className="h-container">
                        <h2 className="heading-2">Sign Up</h2>
                    </div>

                    <div className="inp-container">
                    <input 
                            value={email} 
                            onChange={handleEmailChange}
                            className="inp" 
                            type="email" 
                            placeholder="Enter email"
                        />

                        <input 
                            value={username} 
                            onChange={handleUsernameChange}
                            className="inp" 
                            type="text" 
                            placeholder="Username"
                        />

                        <input 
                            value={password}
                            onChange={handlePasswordChange} 
                            className="inp" 
                            type="password" 
                            placeholder="Password"
                        />
                    </div>

                    <div>
                        {userAlreadyFound && <span className="error">User already exists</span>}
                    </div>

                    <button className="btn">Submit</button>
                </div>
            </form>
        </>
    );
};

export default SignUp;
