"use client";
import { useState, useEffect } from "react";
import { ReactNode } from "react";
import Navigate from "@/app/components/navigation/navigation";
import Footer from "@/app/components/footer/footer";
import Newsletter from "../components/newsletter/newsletter";
import Loader from "../components/loader/loader";

interface LayoutProps {
  children: ReactNode;
}

export default function LayOut({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <main>
      {/* Navbar */}
      <Navigate />
      {children}
      <Newsletter />
      <Footer />
    </main>
  );
}
