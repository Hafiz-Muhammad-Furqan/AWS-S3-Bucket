import { v4 as uuidv4 } from "uuid";
import productModel from "../models/productModel.js";
import createPresignedUrlWithClient from "../config/awsClient.js";

const generatePreSignedURL = async (req, res) => {
  const { mime } = req.query;
  const fileName = uuidv4();
  const fullName = `${fileName}.${mime}`;
  const url = await createPresignedUrlWithClient({
    bucket: process.env.S3_BUCKET,
    key: fullName,
  });

  res.json({ url, fullName });
};

const createProduct = async (req, res) => {
  const { name, price, category, fileName } = req.body;
  if (!name || !price || !category || !fileName) {
    res.status(400).json({ message: "All fields are required" });
  }
  const product = await productModel.create({
    name,
    price,
    category,
    fileName,
  });
  res.status(201).json({ message: "Product created successfully", product });
};

export { generatePreSignedURL, createProduct };
