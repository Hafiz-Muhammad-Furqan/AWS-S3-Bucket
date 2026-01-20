import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to s3 API");
});

app.use("/api", productRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
