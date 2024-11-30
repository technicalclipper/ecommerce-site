import express from "express";
import { getproducts } from "../controller/productController.js";
const router =express.Router();

router.get("/getproducts",getproducts);

export default router;