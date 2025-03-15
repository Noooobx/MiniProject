import { useState } from "react";
import ProfileUpload from "./ProfileUpload";

export default function Profile() {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 p-6">
      <div className="max-w-lg w-full p-10 bg-white shadow-2xl rounded-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">Profile</h2>

        <ProfileUpload profileImage={profileImage} setProfileImage={setProfileImage} isEditing={isEditing} />

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl text-gray-700 shadow-sm bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            disabled={!isEditing}
          />

          <textarea
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl text-gray-700 shadow-sm resize-none bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            disabled={!isEditing}
            rows={3}
          ></textarea>

          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl text-gray-700 shadow-sm bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            disabled={!isEditing}
          />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl text-gray-700 shadow-sm bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500"
            disabled={!isEditing}
          />
        </div>

        <div className="mt-8 flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSubmit}
              className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-semibold shadow-md"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold shadow-md"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
}