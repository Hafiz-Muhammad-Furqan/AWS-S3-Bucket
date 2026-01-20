import { useEffect, useState } from "react";
import {
  Package,
  DollarSign,
  Layers,
  FileImage,
  Plus,
  Loader2,
} from "lucide-react";

const ProductForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const getPreSignedURL = async (file) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/generate-presigned-url?mime=${file.type.split("/")[1]}`,
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) throw new Error("Failed to get presigned URL");

    return response.json();
  };

  const uploadFile = async (file, url) => {
    const uploadResponse = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });

    if (!uploadResponse.ok) throw new Error("File upload failed");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const { url, fullName } = await getPreSignedURL(file);
      await uploadFile(file, url);
      setImageName(fullName);
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
      setImagePreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageName) return;

    setSubmitting(true);

    try {
      const formData = new FormData(e.target);

      const productData = {
        name: formData.get("name"),
        price: Number(formData.get("price")),
        category: formData.get("category"),
        fileName: imageName,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/create-product`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        },
      );

      if (!response.ok) throw new Error("Failed to create product");

      alert("Product created successfully!");
      e.target.reset();
      setImagePreview(null);
      setImageName(null);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[45%] bg-gray-800 border border-gray-600 rounded-xl p-6 space-y-6 shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
          <Package size={22} />
          Add New Product
        </h2>

        {/* Product Name */}
        <div>
          <label className="text-sm text-gray-300">Product Name</label>
          <div className="relative">
            <Package
              className="absolute left-3 top-3 text-gray-500"
              size={18}
            />
            <input
              name="name"
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
            />
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm text-gray-300">Price</label>
          <div className="relative">
            <DollarSign
              className="absolute left-3 top-3 text-gray-500"
              size={18}
            />
            <input
              name="price"
              type="number"
              min="0"
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="text-sm text-gray-300">Category</label>
          <div className="relative">
            <Layers className="absolute left-3 top-3 text-gray-500" size={18} />
            <select
              name="category"
              required
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select category</option>
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="text-sm text-gray-300">Product Image</label>

          <label className="flex items-center justify-center gap-2 cursor-pointer bg-gray-800 border border-dashed border-gray-600 rounded-lg p-4 hover:border-indigo-500 transition">
            {uploading ? (
              <>
                <Loader2 className="animate-spin text-indigo-400" />
                <span className="text-indigo-400 text-sm">
                  Uploading image...
                </span>
              </>
            ) : (
              <>
                <FileImage className="text-gray-300" />
                <span className="text-gray-300 text-sm">
                  Click to upload image
                </span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={uploading}
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
          disabled={uploading || submitting || !imageName}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 disabled:bg-gray-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Creating...
            </>
          ) : (
            <>
              <Plus size={18} />
              Add Product
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
