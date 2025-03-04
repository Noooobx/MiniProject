import React, { useState, useEffect } from "react";

const CATEGORY_EXPIRY = {
  "Leafy Vegetables": 2 * 24 * 60 * 60 * 1000,
  "Root Vegetables": 5 * 24 * 60 * 60 * 1000,
  Fruits: 7 * 24 * 60 * 60 * 1000,
  Eggs: 10 * 24 * 60 * 60 * 1000,
  "Rice & Grains": null, // No expiry
  "Chicken & Meat": 3 * 24 * 60 * 60 * 1000,
};

const UNIT_OPTIONS = {
  "Leafy Vegetables": ["kg", "grams", "bunches"],
  "Root Vegetables": ["kg", "grams", "pieces"],
  Fruits: ["kg", "grams", "pieces"],
  Eggs: ["dozen", "pieces"],
  "Rice & Grains": ["kg", "grams"],
  "Chicken & Meat": ["kg", "grams"],
};

const AddProduct = ({ onAdd }) => {
  const [productName, setProductName] = useState("");
  const [rate, setRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("Leafy Vegetables");
  const [unit, setUnit] = useState(UNIT_OPTIONS[category][0]);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    setUnit(UNIT_OPTIONS[category][0]); // Reset unit when category changes
  }, [category]);

  const handleAddProduct = () => {
    if (!productName || !rate || !quantity) {
      alert("Please fill in all fields!");
      return;
    }

    const expiryTime = CATEGORY_EXPIRY[category] ? Date.now() + CATEGORY_EXPIRY[category] : null;

    const newProduct = {
      id: Date.now(),
      name: productName,
      rate,
      quantity: { value: quantity, unit },
      category,
      expiryTime,
      image: image ? URL.createObjectURL(image) : null,
      video: video ? URL.createObjectURL(video) : null,
    };

    onAdd(newProduct);

    setProductName("");
    setRate("");
    setQuantity("");
    setCategory("Leafy Vegetables");
    setUnit(UNIT_OPTIONS["Leafy Vegetables"][0]);
    setImage(null);
    setVideo(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <input
        type="text"
        placeholder="Product Name (e.g. Eggs, Rice, Chicken)"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

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
          {UNIT_OPTIONS[category].map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
      </div>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      >
        {Object.keys(CATEGORY_EXPIRY).map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full border p-2 rounded mb-3"
      />

      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideo(e.target.files[0])}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={handleAddProduct}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
