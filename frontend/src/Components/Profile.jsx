import { useState } from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (phone.length !== 10 || !/^[0-9]+$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-xl font-semibold mb-4">Profile Setup</h2>
        {/* Profile Picture */}
        <label className="relative cursor-pointer inline-block">
          <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={!isEditing} />
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 mx-auto">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Add Photo
              </div>
            )}
          </div>
        </label>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-4 p-2 border rounded w-full text-center"
          disabled={!isEditing}
        />

        {/* Address Input */}
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-4 p-2 border rounded w-full text-center"
          disabled={!isEditing}
        />

        {/* Phone Number Input */}
        <input
          type="text"
          placeholder="Enter Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-4 p-2 border rounded w-full text-center"
          disabled={!isEditing}
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-4 p-2 border rounded w-full text-center"
          disabled={!isEditing}
        />

        {/* Edit and Submit Buttons */}
        {isEditing ? (
          <button
            onClick={handleSubmit}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full"
          >
            Edit
          </button>
        )}

        {/* Logout Button */}
        <Link to="/login" className="mt-4 block px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Logout
        </Link>
      </div>
    </div>
  );
}