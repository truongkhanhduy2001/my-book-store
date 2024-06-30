"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useCart from "@/app/hooks/useCart";

interface CartContextType {
  cart: any;
  getCart: any;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { cart, getCart } = useCart();
  return (
    <CartContext.Provider value={{ cart, getCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext");
  }
  return context;
};
