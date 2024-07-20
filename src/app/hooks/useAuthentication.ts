"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookie from "js-cookie";

export default function useAuthentication() {
  const [user, setUser] = useState(null);
  const pathName = usePathname();

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookie.get("TOKEN-USER");
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const response = await fetch("/api/users/validation_user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const result = await response.json();
        if (result.status === 200) {
          setUser(result.data);
        } else {
          setUser(null);
          Cookie.remove("TOKEN-USER");
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setUser(null);
        Cookie.remove("TOKEN-USER");
      }
    };

    validateToken();
  }, [pathName]);

  return { user, setUser };
}
