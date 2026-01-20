import express from "express";
import { createProduct, generatePreSignedURL,getAllProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/generate-presigned-url", generatePreSignedURL);

router.post("/create-product", createProduct);
router.get("/products", getAllProducts);

export default router;
