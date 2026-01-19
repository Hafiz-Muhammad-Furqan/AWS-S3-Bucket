import { useState } from "react";
import {
  Package,
  DollarSign,
  Layers,
  FileImage,
  Plus
} from "lucide-react";

const  ProductForm = () =>  {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <form className="w-full max-w-[45%] bg-gray-800 border border-gray-600 rounded-xl p-6 space-y-6 shadow-lg">

        {/* Header */}
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <Package size={22} />
          Add New Product
        </h2>

        {/* Product Name */}
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Product Name</label>
          <div className="relative">
            <Package className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Price</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 text-gray-500" size={18} />
            <input
              type="number"
              placeholder="0.00"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-sm text-gray-300">Category</label>
          <div className="relative">
            <Layers className="absolute left-3 top-3 text-gray-500" size={18} />
            <select className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Select category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Product Image</label>

          <label className="flex items-center justify-center gap-2 cursor-pointer bg-gray-800 border border-dashed border-gray-600 rounded-lg p-4 hover:border-indigo-500 transition">
            <FileImage className="text-gray-300" />
            <span className="text-gray-300 text-sm">
              Click to upload image
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-full h-48 object-cover rounded-lg border border-gray-600"
            />
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
        >
          <Plus size={18} />
          Add Product
        </button>

      </form>
    </div>
  );
}


export default ProductForm