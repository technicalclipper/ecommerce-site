import { AuthContext } from "../contexts/authContext";
import Cartcard from "../components/cartcard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Cart(){
    const [Cart, setCart] = useState([]);
    const { isAuthenticated, loading,user } = useContext(AuthContext); 
    axios.defaults.baseURL = "http://localhost:4000";
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return; 
    
        if (!isAuthenticated) {
            navigate("/"); 
        } 
        else {
            const fetchData = async () => {
                try {
                  const response = await axios.get("/product/getcart");
                  setCart(response.data);
                  console.log(Cart);
                  
                } catch (error) {
                  console.error("Error fetching cart:", error);
                  
                }
              };
              fetchData();
        }
    }, [isAuthenticated, loading, navigate]);
        
    const handledelete = async (no) => {
        try {
            setCart((prev) => prev.filter((items) => items.cno !== no));
            const response = await axios.delete("/product/deletecart", {
                data: { cno: no }  
            });
            toast.success("Deleted item from Cart!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        } catch (error) {
          toast.error("Failed to delete item from cart. Please try again.", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
          });
        }
      };


        if (loading) {
            return <div>Loading...</div>; 
      }
    
    return(
        <>
            <div className="cart-image"></div>
            <div className="producttitle">Your Cart</div>
            <div className="pcardcontainer">
            {Cart.length > 0 ? (
          
            Cart.map((data) => (
            <   Cartcard
                    key={data.cno}
                    no={data.cno}
                    img={data.pno}
                    name={data.products.pname}
                    cost={data.products.cost}
                    onclick={handledelete}
            />))) : (
          
          <div className="producttitle">Your cart is empty.</div>
        )}
            </div>
            <ToastContainer />
        </>
    )
}