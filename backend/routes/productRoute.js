import express from "express";
import { getproducts,addtocart,getcartitems,deletefromcart } from "../controller/productController.js";
const router =express.Router();

router.get("/getproducts",getproducts);
router.post("/addtocart",addtocart);
router.get("/getcart",getcartitems);
router.delete("/deletecart",deletefromcart);
export default router;