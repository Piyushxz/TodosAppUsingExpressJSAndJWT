const SignIn = () =>{
    return(
        <>
            <form>
            <div className="container">
                <div className="h-container">
                     <h2 className="heading-2">Sign In</h2>
                </div>
                
            <div className="inp-container">
                <input className="inp" type="text" placeholder="username"/>

                <input className="inp" type = "text" placeholder="password"/>

            </div>

            
            <button className="btn">Submit</button>
            </div>

                
                
            </form>
        </>
    )
}

export default SignIn