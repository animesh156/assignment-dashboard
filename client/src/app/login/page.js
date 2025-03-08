"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import API from "@/utils/api";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, []);
 


  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await API.post(
        "/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
      });

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", loginResponse.data.name);

      setTimeout(() => {
        router.push("/dashboard"); 
      }, 2000);

    } catch (err) {
      toast.error("Login failed. Please check your credentials.", {
        position: "top-center",
        autoClose: 4000,
      });
      console.error("Login error:", err);
    }
  };

  if (!mounted) return null; 

  return (
    <div
    className="h-screen flex justify-center items-center bg-cover bg-center"
    style={{ backgroundImage: `url("https://res.cloudinary.com/dmdlgpurh/image/upload/v1741415613/bg_1_psbhmx.jpg")` }}
  >
  
      <ToastContainer />
      <div className="backdrop-blur-lg  bg-white/30  border  border-gray-600/20 shadow-lg rounded-lg p-8 w-80 md:w-96">
        <h1 className="text-center text-2xl mb-3 font-bold ">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="required py-2 w-full px-3 bg-transparent  border-gray-400 focus:border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="required py-2 w-full px-3 bg-transparent  border-gray-400 focus:border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <button
              type="submit"
              className="py-2 w-full px-3 font-semibold cursor-pointer rounded-md bg-sky-400 hover:bg-sky-500"
            >
              Login
            </button>
          </div>

          <div>
            <p className="text-center ">
              Don&apos;t have an account?{" "}
              <button 
                type="button"
                className="text-red-500 cursor-pointer hover:text-red-700"
                onClick={() => router.push('/register')} 
              >
                Create account
              </button> 
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
