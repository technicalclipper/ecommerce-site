function login(){
    const [userDetails,setuserDetails]=useState({username:"",password:""});

    return(
        <div className="login-container">
            <div>Username</div>
            <input>
            <div>Password</div>
        </div>
    )
}