import { useState } from "react";
import Header from "../components/header";
import Bgimage from "../components/bgimage";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
function Login(){
    const [userDetails,setuserDetails]=useState({username:"",password:""});
    const { isAuthenticated,user,signup,login,logout } = useContext(AuthContext);
    console.log("the user is",user);
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
            <div className="inner-container">
                <div className="loginhead">Username</div>
                <input name="username" value={userDetails.username} placeholder="enter your username" onChange={updateinfo}/>
                <div className="loginhead">Password</div>
                <input name="password" value={userDetails.password} placeholder="enter your password" onChange={updateinfo}/>
            </div> 
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px',alignItems:'center'}}>
                <Link to="/signup"><div className="loginhead">new user?sign up</div></Link>
                <button className="login" onClick={()=>{login(userDetails.username,userDetails.password)}}>login</button>
            </div>  
        </div>
        </Bgimage>
        </>
    )
}

export default Login;