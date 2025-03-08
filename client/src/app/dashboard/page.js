"use client";
import API from "@/utils/api";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await API.get("/check", { withCredentials: true });

      if (response.status === 401) {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userName");

        toast.error("Session expired. Please log in again.");
        setTimeout(() => router.push("/login"), 2000);

        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error checking session:", error);
      toast.error("Not authorized. Redirecting...");
      setTimeout(() => router.push("/login"), 2000);
      setIsAuthenticated(false);
    } finally {
      setCheckingAuth(false);
    }
  };

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (!storedAuth || storedAuth === "false") {
      toast.error("Not authorized to access the dashboard.");
      setTimeout(() => router.push("/login"), 2000);
      setIsAuthenticated(false);
      setCheckingAuth(false);
      return;
    }

    checkAuth();
    const interval = setInterval(checkAuth, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [router]);

  // 🚨 Prevent Dashboard from rendering when user is unauthorized 
  if (checkingAuth || isAuthenticated === false) {
    return (
      <>
        <ToastContainer />
        <p>{checkingAuth ? "Checking authentication..." : "Redirecting to login..."}</p>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <Table />
    </>
  );
}
