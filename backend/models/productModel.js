import mongoose from "mongoose";

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
export default productModel;