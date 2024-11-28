import { Link } from "react-router-dom"
export default function Header(){
    const isAuthenticated=false ;
    return(
        <div className="header">
        <div className="navtitle">ecommerce</div>
        <div className="login-cont">
            {!isAuthenticated?
            (<><Link to="/login"><button className="header-login">login</button></Link>
            <Link to="/signup"><button className="header-login"> signup</button></Link></>):
            (<><Link to="/signup"><button className="header-login">product</button></Link>
            <Link to="/login"><button className="header-login">logout</button></Link>
            <Link to="/signup"><button className="header-login"> cart</button></Link></>)}
        </div>
        </div>
    )
}