import { useEffect, useState } from "react";
import { useAuth } from "../authcontext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  const {isLogin,toggleAuth}=useAuth();
  useEffect(()=>{
    if(isLogin)
    {
      navigate('/');
    }
  },[isLogin,navigate])
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault(); // stop page refresh
    const {username,email,password}=userData;

const req=await fetch(`${process.env.REACT_APP_API_URL}/api/auth/signup`,{
  method:'POST',
  headers:{
    "Content-type":"application/json"
  },
  body:JSON.stringify({username,email,password}),
});
const res=await req.json();
if(req.ok)
{
toggleAuth();


}
    // console.log(res);
    // later: fetch("/api/auth/signup", { ... })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block mb-1 text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter username"
            />
          </div>

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
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
