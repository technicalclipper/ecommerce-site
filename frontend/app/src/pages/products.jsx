import Productcard from "../components/productcard";
import { AuthContext } from "../contexts/authContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [Product, setProduct] = useState([]);
  const { isAuthenticated, loading,user } = useContext(AuthContext); 
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; 

    if (!isAuthenticated) {
      navigate("/"); 
    } else {
      
      const fetchData = async () => {
        try {
          const response = await axios.get("/product/getproducts");
          setProduct(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Failed to load products. Please try again.");
        }
      };
      fetchData();
    }
  }, [isAuthenticated, loading, navigate]);

  const handleAddToCart = async (no) => {
    try {
      const response = await axios.post("/product/addtocart", { pno: no });
      toast.success("Added to Cart!", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
      });

    } catch (error) {
      console.error("Error adding to cart:", error.message);
      toast.error("Failed to add to cart. Please try again.", {
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

  return (
    <>
      <div className="product-image">
      <div className="ptext">Welcome {isAuthenticated && user?.fullname}!</div>
      </div>
      <div className="producttitle">Explore our old money dresses</div>
      <div className="pcardcontainer">
        {Product.map((data) => (
          <Productcard
            key={data.pno}
            no={data.pno}
            name={data.pname}
            cost={data.cost}
            onclick={handleAddToCart}
          />
        ))}
      </div>
      <ToastContainer />
    </>
  );
}
