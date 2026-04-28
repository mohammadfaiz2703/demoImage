import { useDebugValue, useEffect, useState } from "react";
import { useAuth } from "../authcontext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {toggleAuth,isLogin}=useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
const navigate=useNavigate();
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(()=>{
    if(localStorage.getItem("token")) navigate('/');

  },[isLogin,navigate])
  const handleLogin = async(e) => {
    e.preventDefault(); // ❗ stop page refresh
    
const {email,password}=userData;
const req=await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`,{
  method:'POST',
  headers:{
    "Content-type":'application/json'


  },
  body:JSON.stringify({email,password}),
});
const res=await req.json();
if(req.ok)
{
  localStorage.setItem('token',res.token)
  toggleAuth();
}
console.log(res);
  

    // later you will call backend here
    // axios.post("/api/auth/login", userData)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
