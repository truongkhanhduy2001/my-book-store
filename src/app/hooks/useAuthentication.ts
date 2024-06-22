"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookie from "js-cookie";

export default function useAuthentication() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const pathName = usePathname();
  useEffect(() => {
    const validateToken = async () => {
      setLoadingAuth(true);
      const token = Cookie.get("TOKEN-USER");
      const response = await fetch("/api/users/validation_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();
      setLoadingAuth(false);
      if (result.status === 200) {
        setUser(result.data);
      } else {
        // Nếu status không phải là 200, coi như người dùng không hợp lệ và chuyển hướng họ đến trang đăng nhập
        // Cookie.remove("TOKEN-USER");
        // router.push("/login");
      }
    };
    validateToken();
  }, [pathName]);

  return { user, loadingAuth };
}
