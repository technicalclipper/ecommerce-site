import { Link } from "react-router-dom"
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
export default function Header(){
    const { isAuthenticated,user,signup,login,logout } = useContext(AuthContext);
    return(
        <div className="header">
        <div className="navtitle">ecommerce</div>
        <div className="login-cont">
            {!isAuthenticated?
            (<><Link to="/login"><button className="header-login">login</button></Link>
            <Link to="/signup"><button className="header-login"> signup</button></Link></>):
            (<><Link to="/products"><button className="header-login">product</button></Link>
            <button className="header-login" onClick={logout}>logout</button>
            <Link to="/signup"><button className="header-login"> cart</button></Link></>)}
        </div>
        </div>
    )
}