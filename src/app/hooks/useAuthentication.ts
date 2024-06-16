import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export default function useAuthentication() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const validateToken = async () => {
    const token = Cookie.get("TOKEN-USER");
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
      // Nếu status không phải là 200, coi như người dùng không hợp lệ và chuyển hướng họ đến trang đăng nhập
      Cookie.remove("TOKEN-USER");
      router.push("/login");
    }
  };

  useEffect(() => {
    validateToken();
    // Kiểm tra xác thực người dùng mỗi 5 giây
    const intervalId = setInterval(validateToken, 5000);

    // Dọn dẹp khi unmount
    return () => clearInterval(intervalId);
  }, [router]); // Chạy lại khi router thay đổi

  return { user };
}
