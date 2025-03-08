"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (isAuthenticated === "true") {
      router.push("/dashboard"); // Redirect the user to dashboard if authenticated
    } else {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [router]); 

  return null; // Prevent rendering anything on the home page
}
