import { Link } from "react-router-dom"
export default function Header(){
    return(
        <div className="header">
        <div className="navtitle">ecommerce</div>
        <div className="login-cont">
            <Link to="/login"><button className="header-login">login</button></Link>
            <Link to="/signup"><button className="header-login"> signup</button></Link>
        </div>
        </div>
    )
}