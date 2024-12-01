import Productcard from "../components/productcard"
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
import { useEffect, useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


export default function Products(){
    const [Product,setProduct]=useState([]);
    const { isAuthenticated,user,signup,login,logout } = useContext(AuthContext);
    axios.defaults.baseURL = "http://localhost:4000";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true; 
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchdata = async()=>{
            const response=await axios.get("/product/getproducts");
            setProduct(response.data);
        }
        fetchdata();
        
    },[])

   
    const handleAddToCart = () => {
        toast.success('Added to Cart!', {
          position: 'bottom-center',  
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
        });
    };
        
    return (
        <>
          <div className="product-image"></div>
          <div className="producttitle">Explore our old money dresses</div>
          <div className="pcardcontainer">
            {Product.map((data) => {
              return <Productcard key={data.pno} no={data.pno} name={data.pname} cost={data.cost} onclick={handleAddToCart}/>;
            })}
          </div>
          <ToastContainer />
        </>
      );}