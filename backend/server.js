import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

app.use(express.json());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
})();

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Electronics", "Clothing", "Accessories"],
  },
  fileName: {
    type: String,
    required: true,
  },
});

const productModel = mongoose.model("Product", productSchema);

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const createPresignedUrlWithClient = ({ bucket, key }) => {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

app.get("/", (req, res) => {
  res.send("Welcome to s3 API");
});

app.get("/api/generate-presigned-url", async (req, res) => {
  const { mime } = req.body;
  const fileName = uuidv4();
  const fullName = `${fileName}.${mime}`;
  const url = await createPresignedUrlWithClient({
    bucket: process.env.S3_BUCKET,
    key: fullName,
  });
  res.json({ url, fullName });
});

app.post("/api/create-product", async (req, res) => {
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
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
