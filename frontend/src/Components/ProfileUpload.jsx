import React from "react";

const ProfileUpload = ({ profileImage, setProfileImage, isEditing }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <label className="relative cursor-pointer group">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          disabled={!isEditing}
        />
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-green-400 bg-gray-100 flex items-center justify-center shadow-md group-hover:opacity-80 transition">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-sm">Add Photo</span>
          )}
        </div>
      </label>
    </div>
  );
};

export default ProfileUpload;