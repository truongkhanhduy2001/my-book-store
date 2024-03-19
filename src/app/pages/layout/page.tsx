import { ReactNode, useState } from "react";
import Navigate from "@/app/components/navigation/navigation";
import Footer from "@/app/components/footer/footer";

interface LayoutProps {
  children: ReactNode;
}

export default function LayOut({ children }: LayoutProps) {
  return (
    <main>
      {/* Navbar */}
      <Navigate />
      {children}
      <Footer />
    </main>
  );
}
