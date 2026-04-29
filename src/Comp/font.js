import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authcontext";

export default function UploadImage() {
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleLogout=()=>{
  localStorage.removeItem('token');
  navigate('login');
  
}
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  const uploadImage = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // 🔑 field name must match backend

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
     
      const data = await res.json();

      if (res.ok) {
        alert("Image uploaded successfully");
      } else {
        alert(data.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
      <Link to='/imageShowplease' className="logout-btn">
        ShowImage
      </Link>
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-sm flex flex-col gap-5">
        <h2 className="text-xl font-semibold text-center">
          Upload Image
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="
            block w-full text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-medium
            file:bg-gray-100 file:text-gray-700
            hover:file:bg-gray-200
            cursor-pointer
          "
        />

        <button
          onClick={uploadImage}
          className="
            w-full py-2 rounded-lg
            bg-black text-white
            hover:bg-gray-900
            transition
          "
        >
          Upload
        </button>
      </div>
    </div>
  );
}