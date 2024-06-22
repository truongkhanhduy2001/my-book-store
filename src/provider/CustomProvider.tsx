"use client";
import React, { createContext, useContext, ReactNode } from "react";

import useAuthentication from "@/app/hooks/useAuthentication";

interface CustomContextType {
  user: any;
}

const CustomContext = createContext<CustomContextType | undefined>(undefined);

export const CustomProvider = ({ children }: { children: ReactNode }) => {
  const { user, loadingAuth } = useAuthentication();
  return (
    <CustomContext.Provider value={{ user }}>{children}</CustomContext.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(CustomContext);
  if (context === undefined) {
    throw new Error("useCustomContext");
  }
  return context;
};
