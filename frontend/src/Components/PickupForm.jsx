import { useState } from "react";
import { useParams } from "react-router-dom";

const PickupForm = () => {
    const { id } = useParams();
    console.log(id);
  const [formData, setFormData] = useState({
    pickupDate: "",
    pickupPlace: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const baserUrl = "http://localhost:5000/api/success";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/success/auction-orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: formData.pickupPlace,
          contactInfo: formData.pickupDate,
        }),
      });
      
      const result = await response.json();
      if (response.ok) {
        console.log("Order updated successfully:", result);
      } else {
        console.error("Error updating order:", result.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="flex flex-col gap-6 p-6 bg-gradient-to-br from-green-100 to-white shadow-lg rounded-2xl w-96 border border-green-300"
      >
        <label className="flex flex-col text-gray-700 font-medium">
          Pickup Date:
          <input
            type="date"
            name="pickupDate"
            value={formData.pickupDate}
            onChange={handleChange}
            className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            required
          />
        </label>
        <label className="flex flex-col text-gray-700 font-medium">
          Pickup Place:
          <input
            type="text"
            name="pickupPlace"
            value={formData.pickupPlace}
            onChange={handleChange}
            className="border p-3 rounded-lg shadow-sm focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            placeholder="Enter location"
            required
          />
        </label>
        <button 
          type="submit" 
          className="bg-green-500 text-white p-3 rounded-lg font-semibold hover:bg-green-600 transition-all shadow-md"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PickupForm;