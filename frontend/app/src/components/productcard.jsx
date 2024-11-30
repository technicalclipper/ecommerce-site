import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Productcard({no,name,cost,onclick}){
    return(
        <div className="pcard">
            <img className="pimg" src={`${no}.jpg`}/>
            <div className="innerpcard">
                <div className="loginhead">{name}</div>
                <div className="loginhead">${cost}</div>
                <button className="login addtocart" onClick={onclick}>add to cart</button>
            </div>
        </div>
    )
}