import { useState } from "react";
function Login(){
    const [userDetails,setuserDetails]=useState({username:"",password:""});

    function updateinfo(e){
        const name=e.target.name;
        const value=e.target.value;
        setuserDetails((prev)=>{
            return({...prev,[name]:value});
        })
    }

    return(
        <div className="login-container">
            <div>Username</div>
            <input name="username" value={userDetails.username} placeholder="enter your username" onChange={updateinfo}/>
            <div>Password</div>
            <input name="password" value={userDetails.password} placeholder="enter your password" onChange={updateinfo}/>
        </div>
    )
}

export default Login;