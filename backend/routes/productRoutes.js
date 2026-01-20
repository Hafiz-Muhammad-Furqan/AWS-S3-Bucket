import express from "express";
import { createProduct, generatePreSignedURL } from "../controllers/productController.js";

const router = express.Router();

router.get("/generate-presigned-url", generatePreSignedURL);

router.post("/create-product", createProduct);

export default router;
