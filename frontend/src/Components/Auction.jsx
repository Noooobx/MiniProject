import { useState, useEffect } from "react";
import OngoingAuctions from "./OngoingAuctions";

export default function AuctionForm({ user }) {
  const [product, setProduct] = useState({
    name: "",
    basePrice: "",
    quantity: "",
    unit: "kg",
    contact: "",
    category: "",
    startTime: "",
    endTime: "",
    images: [],
    videos: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to create an auction.");
      return;
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const newFiles = Array.from(files).slice(0, name === "images" ? 5 : 2);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setProduct((prev) => ({ ...prev, [name]: newFiles }));
      if (name === "images") setImagePreviews(newPreviews);
      if (name === "videos") setVideoPreviews(newPreviews);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to create an auction.");
      return;
    }
    console.log("Auction Form Data:", product);
    alert("Auction form submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-evenly  bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto p-6 shadow-lg rounded-lg border border-gray-300 bg-white">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">Create an Auction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full p-3 border rounded" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
            <input className="w-full p-3 border rounded" name="basePrice" placeholder="Base Price" type="number" value={product.basePrice} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input className="w-full p-3 border rounded" name="quantity" placeholder="Quantity" type="number" value={product.quantity} onChange={handleChange} required />
            <select className="p-3 border rounded" name="unit" value={product.unit} onChange={handleChange}>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="liters">liters</option>
              <option value="pieces">pieces</option>
            </select>
          </div>
          <select className="w-full p-3 border rounded" name="category" value={product.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="grains">Grains</option>
          </select>
          <input className="w-full p-3 border rounded" name="contact" placeholder="Contact Details" value={product.contact} onChange={handleChange} required />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-600">Auction Start Time</label>
              <input className="w-full p-3 border rounded" name="startTime" type="datetime-local" value={product.startTime} onChange={handleChange} required />
            </div>
            <div>
              <label className="text-gray-600">Auction End Time</label>
              <input className="w-full p-3 border rounded" name="endTime" type="datetime-local" value={product.endTime} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="text-gray-600">Upload Images (Max: 5)</label>
            <input className="w-full p-3 border rounded" name="images" type="file" accept="image/*" multiple onChange={handleFileChange} required />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt="Preview" className="rounded shadow-md" height={120} width={120} />
              ))}
            </div>
          </div>
          <div>
            <label className="text-gray-600">Upload Videos (Max: 2)</label>
            <input className="w-full p-3 border rounded" name="videos" type="file" accept="video/*" multiple onChange={handleFileChange} required />
            <div className="mt-2 grid grid-cols-2 gap-2">
              {videoPreviews.map((src, index) => (
                <video key={index} src={src} controls className="rounded shadow-md" height={120} width={120} />
              ))}
            </div>
          </div>
          <button type="submit" className="w-full p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">Submit Auction</button>
        </form>
      </div>

    </div>
  );
}
