"use client";
import React, { createContext, useContext, ReactNode } from "react";
import useWish from "@/app/hooks/useWish";

interface WishContextType {
  wish: any;
  getWish: any;
}

const WishContext = createContext<WishContextType | undefined>(undefined);

export const WishProvider = ({ children }: { children: ReactNode }) => {
  const { wish, getWish } = useWish();
  return (
    <WishContext.Provider value={{ wish, getWish }}>
      {children}
    </WishContext.Provider>
  );
};

export const useWishContext = () => {
  const context = useContext(WishContext);
  if (context === undefined) {
    throw new Error("useWishContext");
  }
  return context;
};
