import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCustomContext } from "@/provider/CustomProvider";

export default function useWish() {
  const { user } = useCustomContext();
  const [wish, setWish] = useState(null);
  const pathName = usePathname();
  const [getWishAgain, setGetWishAgain] = useState(false);

  const getWish = async () => setGetWishAgain(true);
  useEffect(() => {
    const getWish = async () => {
      const response = await fetch(`/api/wish/get?userId=${user?._id}`);

      const result = await response.json();
      if (result.status === 200) {
        setWish(result.data);
      }
    };
    if (!wish) {
      getWish();
    }
    if (getWishAgain && wish) {
      getWish();
      setGetWishAgain(false);
    }
  }, [pathName, wish, user?._id, getWishAgain]);

  return { wish, getWish };
}
