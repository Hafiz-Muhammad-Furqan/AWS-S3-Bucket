import express from "express";
import { createProduct } from "../controllers/productController";

const router = express.Router();

router.get("/generate-presigned-url", generatePreSignedURL);

router.post("/create-product", createProduct);

export default router;
