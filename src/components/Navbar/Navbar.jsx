import { useModal } from "../../context/modal-context"
const Navbar = () =>{
    const {modalDispatch} = useModal()
    const handleSignInClick = () =>{
        modalDispatch({
            type:"OPEN_SIGNIN_MODAL"
        })
    }

    const handleSignUpClick = () =>{
        modalDispatch({
            type:"OPEN_SIGNUP_MODAL"
        })
    }
    return(
        <>
        <div className="navbar-container">

            <div >
                <h1>100xDevs</h1>
                
            </div>

            <div>
                <button className="btn-2" onClick={handleSignInClick}>SignIn</button>
                <button className="btn-2" onClick={handleSignUpClick}>SignUp</button>
            </div>

        </div>
        </>
    )
}

export default Navbar