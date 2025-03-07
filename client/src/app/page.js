// import Image from "next/image";
"use client"
import styles from "./page.module.css";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  

  // Redirect to login page when home loads
  router.push('/login');

  return null;

}
