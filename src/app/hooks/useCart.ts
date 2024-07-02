import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCustomContext } from "@/provider/CustomProvider";

export default function useCart() {
  const { user } = useCustomContext();
  const [cart, setCart] = useState(null);
  const pathName = usePathname();
  const [getCartAgain, setGetCartAgain] = useState(false);

  const getCart = async () => setGetCartAgain(true);
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(`/api/cart/get?id=${user?._id}`);

      const result = await response.json();
      if (result.status === 200) {
        setCart(result.cart);
      }
    };
    if (!cart) {
      fetchCart();
    }
    if (getCartAgain && cart) {
      fetchCart();
      setGetCartAgain(false);
    }
  }, [pathName, cart, user?._id, getCartAgain]);

  return { cart, getCart };
}
