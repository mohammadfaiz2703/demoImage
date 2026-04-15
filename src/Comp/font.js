import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authcontext";

export default function UploadImage() {
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("token"))
    {
      navigate('/login')
    }
  }, [isLogin, navigate]);

  const uploadImage=async()=>{
    const send=await fetch(`http://localhost:5000/api/upload`,{
      method:"post",
      headers:{
        "content-type":'application/json',
"authentication":`Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-sm flex flex-col gap-5">
        
        <h2 className="text-xl font-semibold text-center">
          Upload Image
        </h2>

        <input
          type="file"
          accept="image/*"
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
          className="
            w-full py-2 rounded-lg
            bg-black text-white
            hover:bg-gray-900
            transition
          "
          onClick={()=>{uploadImage()}}
        >
          Upload
        </button>
      </div>
    </div>
  );
}


// what to do tomorrow
/* 
1. add image upload api
2. add logout
3. make a password store app just for you


*/