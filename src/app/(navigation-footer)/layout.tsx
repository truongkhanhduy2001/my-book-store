"use client";
import { ReactNode, useState } from "react";
import Navigate from "@/app/components/navigation/navigation";
import Footer from "@/app/components/footer/footer";
import Newsletter from "../components/newsletter/newsletter";
import { useCartContext } from "@/provider/CartProvider";
import { useWishContext } from "@/provider/WishProvider";

interface LayoutProps {
  children: ReactNode;
}

export default function LayOut({ children }: LayoutProps) {
  const { cart } = useCartContext();
  const { wish } = useWishContext();
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
