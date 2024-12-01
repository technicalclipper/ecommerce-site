import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Cartcard({no,name,cost,img,onclick}){
    return(
        <div className="pcard">
            <img className="pimg" src={`${img}.jpg`}/>
            <div className="innerpcard">
                <div className="loginhead">{name}</div>
                <div className="loginhead">{cost}</div>
                <button className="login addtocart d" onClick={()=>{onclick(no)}} >delete from cart </button>
            </div>
        </div>
    )
}