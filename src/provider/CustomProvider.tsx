"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import useAuthentication from "@/app/hooks/useAuthentication";

interface CustomContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const CustomContext = createContext<CustomContextType | undefined>(undefined);

export const CustomProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const { user: authUser } = useAuthentication();

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  return (
    <CustomContext.Provider value={{ user, setUser }}>
      {children}
    </CustomContext.Provider>
  );
};

export const useCustomContext = () => {
  const context = useContext(CustomContext);
  if (context === undefined) {
    throw new Error("useCustomContext must be used within a CustomProvider");
  }
  return context;
};
