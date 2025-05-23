import { useState } from "react";

export default function CloudinaryUploadTest({ refreshProducts }) {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [productName, setProductName] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Leafy Vegetables");
  const [unit, setUnit] = useState("kg");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [customProduct, setCustomProduct] = useState("");

  const CATEGORY_OPTIONS = {
    "Leafy Vegetables": ["kg", "grams", "bunches"],
    "Root Vegetables": ["kg", "grams", "pieces"],
    Fruits: ["kg", "grams", "pieces"],
    Eggs: ["dozen", "pieces"],
    "Rice & Grains": ["kg", "grams"],
    "Chicken & Meat": ["kg", "grams"],
  };

  const CATEGORY_ITEMS = {
    "Leafy Vegetables": ["Spinach", "Coriander", "Fenugreek"],
    "Root Vegetables": ["Carrot", "Beetroot", "Potato"],
    Fruits: ["Apple", "Banana", "Mango"],
    Eggs: ["Country Eggs", "White Eggs", "Brown Eggs"],
    "Rice & Grains": ["Basmati Rice", "Wheat", "Lentils"],
    "Chicken & Meat": ["Chicken", "Mutton", "Fish"],
  };

  const getAuthToken = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  };

  const getTokenPayload = () => {
    const token = getAuthToken();
    if (!token) return null;

    try {
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(
        payloadBase64.replace(/-/g, "+").replace(/_/g, "/")
      );
      return JSON.parse(payloadJson);
    } catch (error) {
      console.error("Invalid token payload:", error);
      return null;
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image");
      return null;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await fetch(baseUrl + "/api/product/upload", {
        method: "POST",
        body: formData,
        credentials:"include"
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        setImageUrl(data.imageUrl);
        return data.imageUrl;
      } else {
        alert("Upload failed: " + data.error);
        return null;
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    const finalProductName =
      productName === "custom" ? customProduct : productName;

    if (!finalProductName || !rate || !quantity || !image) {
      alert("Please fill in all fields and select an image.");
      return;
    }

    setSubmitting(true);
    const uploadedImageUrl = await uploadImage();

    if (!uploadedImageUrl) {
      setSubmitting(false);
      return;
    }

    

    const productData = {
      name: finalProductName,
      price: rate,
      quantity,
      productType: category,
      category,
      unit,
      image: uploadedImageUrl,
      video: "",
      description: "",
    };
    try {
      const response = await fetch(baseUrl + "/api/product/add/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        
        
        body: JSON.stringify(productData),
        credentials: "include", // Include credentials (cookies) with the request
      });

      const result = await response.json();

      if (response.ok) {
        alert("Product added successfully!");
        refreshProducts();

        setProductName("");
        setRate("");
        setQuantity("");
        setCategory("Leafy Vegetables");
        setUnit(CATEGORY_OPTIONS["Leafy Vegetables"][0]);
        setImage(null);
        setImageUrl("");
        setCustomProduct("");
      } else {
        alert("Submission failed: " + result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Submission error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Upload Product</h2>

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setUnit(CATEGORY_OPTIONS[e.target.value][0]);
          setProductName("");
          setCustomProduct("");
        }}
        className="w-full border p-2 rounded mb-3"
      >
        {Object.keys(CATEGORY_OPTIONS).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Product Dropdown */}
      <select
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      >
        <option value="">Select Product</option>
        {CATEGORY_ITEMS[category].map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
        <option value="custom">Other (Add Manually)</option>
      </select>

      {/* Custom Product Input */}
      {productName === "custom" && (
        <input
          type="text"
          placeholder="Enter Product Name"
          value={customProduct}
          onChange={(e) => setCustomProduct(e.target.value)}
          className="w-full border p-2 rounded mb-3"
        />
      )}

      <input
        type="number"
        placeholder="Rate (₹ per unit)"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <div className="flex gap-2 mb-3">
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border p-2 rounded"
        >
          {CATEGORY_OPTIONS[category].map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={uploadImage}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full mb-3"
        disabled={loading}
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="max-w-full h-auto border rounded mt-2"
        />
      )}

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full mt-3"
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Product"}
      </button>
    </div>
  );
}
