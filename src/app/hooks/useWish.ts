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
    const fetchWishWithReviews = async () => {
      if (!user?._id) return;

      try {
        const response = await fetch(`/api/wish/get?userId=${user._id}`);
        const result = await response.json();

        if (result.status === 200) {
          // Fetch reviews for each product in the wish list
          const wishWithReviews = await Promise.all(
            result.data.listWish.map(async (item: any) => {
              const reviewResponse = await fetch(
                `/api/review/get?id=${item.productId._id}`
              );
              const reviewData = await reviewResponse.json();

              return {
                ...item,
                productId: {
                  ...item.productId,
                  reviews: reviewData.reviews,
                },
              };
            })
          );

          setWish({
            ...result.data,
            listWish: wishWithReviews,
          });
        }
      } catch (error) {
        console.error("Error fetching wish list with reviews:", error);
      }
    };

    if (!wish || getWishAgain) {
      fetchWishWithReviews();
      setGetWishAgain(false);
    }
  }, [pathName, wish, user?._id, getWishAgain]);

  return { wish, getWish };
}
