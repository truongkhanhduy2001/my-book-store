import { ReactNode, useState } from "react";
import Navigate from "@/app/components/navigation/navigation";
import Footer from "@/app/components/footer/footer";
import Newsletter from "../components/newsletter/newsletter";

interface LayoutProps {
  children: ReactNode;
}

export default function LayOut({ children }: LayoutProps) {
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
