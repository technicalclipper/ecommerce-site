import { useState } from "react";
import Header from "../components/header";
import Bgimage from "../components/bgimage";
import { Link } from "react-router-dom";
function Signup(){
    const [userDetails,setuserDetails]=useState({fullname:"",username:"",password:"" });

    function updateinfo(e){
        const name=e.target.name;
        const value=e.target.value;
        setuserDetails((prev)=>{
            return({...prev,[name]:value});
        })
    }

    return(
        <>
        <Bgimage>
        <div className="login-container">
            <div className="loginhead" style={{fontWeight:"700"}}>Login</div>
            <div className="s-inner-container">
                <div className="loginhead">Fullname</div>
                <input name="fullname" value={userDetails.fullname} placeholder="enter your fullname" onChange={updateinfo}/>
                <div className="loginhead">Username</div>
                <input name="username" value={userDetails.username} placeholder="enter your username" onChange={updateinfo}/>
                <div className="loginhead">Password</div>
                <input name="password" value={userDetails.password} placeholder="enter your password" onChange={updateinfo}/>
            </div> 
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px',alignItems:'center'}}>
                <Link to="/login"><div className="loginhead">existing user?login</div></Link>
                <button className="login">signup</button>
            </div>  
        </div>
        </Bgimage>
        </>
    )
}

export default Signup;