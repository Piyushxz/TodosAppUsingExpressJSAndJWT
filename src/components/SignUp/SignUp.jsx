import axios from "axios";
import { useState } from "react";
import { useModal } from "../../context/modal-context";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { isSignInModalOpen, modalDispatch } = useModal();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        console.log(username, password);
        try {
            const response = await axios.post("https://todoappbackend-qqai.onrender.com/signup", { email, username, password });
            console.log(response);
    
            setEmail('');
            setUsername('');
            setPassword('');
    
            modalDispatch({
                type: "OPEN_SUCCESS_MODAL"
            });
    
            setTimeout(() => {
                modalDispatch({
                    type: "OPEN_SUCCESS_MODAL"
                });
    
                modalDispatch({
                    type: "OPEN_SIGNIN_MODAL"
                });
            }, 1000);
        } catch (err) {
            console.error('Error:', err);
            if (err.response) {
                if (err.response.status === 409) {
                    setErrorMessage('User already exists.');
                } else if (err.response.status === 400) {
                    setErrorMessage('Invalid password format. Must contain lowercase, uppercase, number, and special character.');
                } else {
                    setErrorMessage('Something went wrong. Please try again later.');
                }
            } else {
                setErrorMessage('Network error. Please check your connection.');
            }
            
            console.log('Error message set:', errorMessage);
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

                    <div className="err-contain">
                        {errorMessage && <span className="error">{errorMessage}</span>}
                    </div>

                    <button className="btn">Submit</button>
                </div>
            </form>
        </>
    );
};

export default SignUp;
