import { useState } from "react";

export default function CloudinaryUploadTest() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image");
    
    const formData = new FormData();
    formData.append("image", image);
    
    try {
      setLoading(true);
      const response = await fetch(baseUrl+"/api/product/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.imageUrl);
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 h-screen flex flex-col justify-center items-center text-center">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
        {loading ? "Uploading..." : "Upload"}
      </button>
      {imageUrl && (
        <div className="mt-4">
          <p>Uploaded Image:</p>
          <img src={imageUrl} alt="Uploaded" className="max-w-full h-auto border rounded" />
        </div>
      )}
    </div>
  );
}
