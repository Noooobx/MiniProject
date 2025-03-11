import { useState } from "react";

export default function AuctionForm() {
  const [product, setProduct] = useState({
    name: "",
    basePrice: "",
    quantity: "",
    unit: "kg",
    contact: "",
    image: null,
    video: null,
    backgroundImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setProduct((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Auction submitted:", product);
  };

  return (
    <div
      className="max-w-lg mx-auto p-8 shadow-lg rounded-lg border border-gray-200"
      style={{
        backgroundImage: product.backgroundImage ? `url(${URL.createObjectURL(product.backgroundImage)})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Create Auction</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">Product Name</label>
          <input className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-300" name="name" placeholder="Enter product name" value={product.name} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Base Price</label>
          <input className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-300" name="basePrice" placeholder="Enter base price" type="number" value={product.basePrice} onChange={handleChange} required />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-gray-600 mb-1">Quantity</label>
            <input className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-300" name="quantity" placeholder="Enter quantity" type="number" value={product.quantity} onChange={handleChange} required />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Unit</label>
            <select className="p-3 border rounded focus:ring-2 focus:ring-blue-300" name="unit" value={product.unit} onChange={handleChange}>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="liters">liters</option>
              <option value="pieces">pieces</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Contact Details</label>
          <input className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-300" name="contact" placeholder="Enter contact details" value={product.contact} onChange={handleChange} required />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Upload Image</label>
          <input className="w-full p-3 border rounded" name="image" type="file" accept="image/*" onChange={handleFileChange} required />
        </div>
        <div>
          <label className="block text-gray-600 mb-1">Upload Video</label>
          <input className="w-full p-3 border rounded" name="video" type="file" accept="video/*" onChange={handleFileChange} required />
        </div>
       
        <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Submit Auction</button>
      </form>
    </div>
  );
}