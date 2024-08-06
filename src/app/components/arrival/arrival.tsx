"use client";
import Link from "next/link";
import "./arrival.css";
import Image from "next/image";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useCustomContext } from "@/provider/CustomProvider";
import { useWishContext } from "@/provider/WishProvider";
import { useCartContext } from "@/provider/CartProvider";
import SkeletonLoad from "../SkeletonLoad/Skeleton";

export default function Arrival() {
  const router = useRouter();
  const { user } = useCustomContext();
  const [products, setProducts] = useState(null) as any;
  const { wish, getWish } = useWishContext();
  const { cart, getCart } = useCartContext();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataArrival = async () => {
      console.log("Fetching arrival data...");
      try {
        const res = await fetch("/api/product/arrival");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);

        const data = await res.json();
        console.log("Arrival data received:", data);

        if (!Array.isArray(data.data)) {
          throw new Error("Invalid data format");
        }

        const productsWithReviews = await Promise.all(
          data.data.map(async (product: any) => {
            console.log(`Fetching reviews for product ${product._id}...`);
            try {
              const reviewRes = await fetch(
                `/api/review/get?id=${product._id}`
              );
              if (!reviewRes.ok)
                throw new Error(
                  `Failed to fetch reviews: ${reviewRes.statusText}`
                );

              const reviewData = await reviewRes.json();
              console.log(
                `Reviews received for product ${product._id}:`,
                reviewData
              );
              return {
                ...product,
                reviews: reviewData.reviews || [],
              };
            } catch (reviewErr) {
              console.error(
                `Error fetching reviews for product ${product._id}:`,
                reviewErr
              );
              return {
                ...product,
                reviews: [],
              };
            }
          })
        );

        console.log("All products with reviews:", productsWithReviews);
        setProducts(productsWithReviews);
      } catch (err) {
        console.error("Error fetching arrival data:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDataArrival();
  }, []);

  // Button Cart
  const handleCart = async (e: any, productId: any) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (productId?.stock === 0) {
      Toastify({
        text: "This product is out of stock!",
        offset: {
          x: 50,
          y: 10,
        },
        gravity: "top",
        position: "right",
        className: "info",
        stopOnFocus: true,
        duration: 5000,
      }).showToast();
      return;
    }
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          productId: productId._id,
          quantity: 1,
          price: productId.discount > 0 ? productId.discount : productId.price,
          totalPrice: productId.price * 1,
        }),
      });

      const data = await response.json();
      if (data.status === 200) {
        getCart();
      } else {
        console.error("Failed to add to cart:", data);
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  // Icon heart
  const handleHeart = async (e: any, productId: any) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      const res = await fetch("/api/wish/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user._id,
          productId: productId,
        }),
      });
      if (!res.ok)
        throw new Error(`Failed to add to wishlist: ${res.statusText}`);

      await res.json();
      getWish();
    } catch (err) {
      console.log("Error adding to wishlist:", err);
    }
  };

  // Get wish
  const [wishList, setWishList] = useState({}) as any;

  useEffect(() => {
    if (wish) {
      const initialWishList: any = {};
      wish.listWish.forEach((item: any) => {
        initialWishList[item.productId._id] = true;
      });
      setWishList(initialWishList);
    }
  }, [wish]);

  const calculateAverageRating = (reviews: any) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce(
      (acc: any, review: any) => acc + review.rating,
      0
    );
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <>
      <section
        className="section-p2 flex flex-col mt-[var(--margin-top)]"
        id="newarrival"
      >
        <div className="section-p2-container max-w-[var(--width-home)] w-[100%] m-[auto] flex justify-between">
          <h2 className="flex justify-center items-center text-[25px] text-[var(--title-color)] font-bold">
            New Arrivals
          </h2>
          <Link href="/arrivalPage" style={{ display: "inline-block" }}>
            <h3 className="flex text-[18px] mt-[5px] text-[var(--text-color)] hover:text-[var(--first-color)]">
              View all
            </h3>
          </Link>
        </div>
        <div className="arrivals-container flex justify-center mt-[var(--margin-top-font)]">
          {Loading && (
            <div className="arrivals max-w-[var(--width-home)] w-[100%]">
              <div className="arrivals-box grid grid-cols-4 gap-[15px]">
                {[...Array(8)].map((_, index) => (
                  <SkeletonLoad key={index} />
                ))}
              </div>
            </div>
          )}
          {!Loading && products && products.length > 0 && (
            <div className="arrivals max-w-[var(--width-home)] w-[100%]">
              <div className="arrivals-box grid grid-cols-4 gap-[15px]">
                {products?.slice(-8).map((product: any) => {
                  const { discount, price, time, stock } = product;
                  const per = (
                    ((Number(discount) - Number(price)) / Number(price)) *
                    100
                  ).toFixed(0);

                  const isWished = wishList[product._id];
                  const averageRating = calculateAverageRating(product.reviews);
                  return (
                    <Link
                      key={product?._id}
                      href={{
                        pathname: "/productDetail",
                        query: { id: product?._id },
                      }}
                      className="arrivals-card group/arrivals-card relative text-center p-[10px] mt-[16px] bg-[var(--card-color)] rounded-[5px] cursor-pointer border-[2px] border-solid border-[var(--border-color)] transition-transform duration-[100ms] ease hover:border-[var(--first-color)] hover:transition hover:duration-[100ms] hover:ease"
                    >
                      {time == "new" && (
                        <div className="arrivals-label absolute top-[10%] left-[27%] translate-x-[-50%] translate-y-[-50%] z-[1] bg-[var(--first-color)] rounded-[5px]">
                          <span className="new text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
                            NEW
                          </span>
                        </div>
                      )}
                      {stock == 0 && (
                        <div className="arrivals-label absolute top-[3%] left-[20%] translate-x-[-50%] translate-y-[-50%] z-[1] bg-[red] rounded-[5px]">
                          <span className="sold-out text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
                            SOLD OUT
                          </span>
                        </div>
                      )}
                      <div className="arrivals-img !relative w-[150px] h-[220px] ml-[auto] mr-[auto] cursor-pointer overflow-hidden shadow-[0_0_8px_var(--title-color)]">
                        <Image
                          className="!relative duration-[300ms] group-hover/arrivals-card:scale-110"
                          src={product?.image}
                          alt="Main Image"
                          fill
                          priority={true}
                          sizes="(max-with: 768px) 100vw"
                        />
                      </div>
                      <div className="arrivals-tag">
                        <h2 className="mt-[20px] mb-[8px] text-[var(--title-color)] font-bold text-[16px]">
                          {product?.name}
                        </h2>
                        <div className="average-rating flex items-center justify-center mb-[8px]">
                          <div className="stars flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`text-[16px] ${
                                  star <= Math.round(Number(averageRating))
                                    ? "text-[#ffc107]"
                                    : "text-[#A0A3B1]"
                                }`}
                              >
                                <FaStar />
                              </span>
                            ))}
                          </div>
                          <span className="ml-[5px] text-[12px] text-gray-500">
                            ({product.reviews ? product.reviews.length : 0}{" "}
                            reviews)
                          </span>
                        </div>
                        <div className="Arrivalwriter text-[var(--text-color)] text-[16px]">
                          {product?.author}
                        </div>
                        <div className="Arrivalcategories text-[var(--second-color)] mt-[8px] text-[16px]">
                          {product?.genre}
                        </div>
                        <div className="Arrivalbook-price mt-[8px] mb-[15px]">
                          {discount > "0" && (
                            <h4
                              className="text-[16px] text-[var(--title-color)] font-normal"
                              style={{
                                textDecoration: "none",
                                color: "hsl(230, 70%, 16%)",
                                fontWeight: "bold",
                              }}
                            >
                              ${discount}
                            </h4>
                          )}
                          <h3
                            className="text-[var(--title-color)] text-[16px] font-bold"
                            style={
                              discount > "0"
                                ? {
                                    textDecoration: "line-through",
                                    color: "hsl(230, 16%, 45%)",
                                    fontWeight: "400",
                                  }
                                : { textDecoration: "none" }
                            }
                          >
                            ${price}
                          </h3>

                          {discount > "0" && (
                            <span className="sale text-[14px] border-[1px] border-solid bg-[var(--first-color)] text-[var(--white-color)] rounded-[5px]">
                              -{per}%
                            </span>
                          )}
                        </div>
                        {stock > 0 ? (
                          <div
                            className="Arrivalcart-btn group/Arrivalcart-btn text-[12px] inline-block text-center font-bold p-[5px] border-[3px] border-solid border-[var(--first-color)] rounded-[5px] relative text-[var(--first-color)] z-[1] hover:bg-[var(--first-color)] transition duration-[300ms] tracking-[2px]"
                            onClick={(e) => handleCart(e, product)}
                          >
                            <i className="text-[12px] absolute top-[48.5%] left-[15%] translate-x-[-50%] translate-y-[-50%] duration-[250ms] group-hover/Arrivalcart-btn:left-[50%] group-hover/Arrivalcart-btn:text-[var(--white-color)]">
                              <FaShoppingCart />
                            </i>
                            <p className="add-cart font-bold text-[12px] ml-[30px] text-[var(--first-color)] duration-[250ms]">
                              Add to Cart
                            </p>
                          </div>
                        ) : (
                          <div className="Arrivalcart-btn text-[12px] inline-block text-center font-bold p-[5px] border-[3px] border-solid border-[red] rounded-[5px] relative text-[red] z-[1] cursor-not-allowed">
                            <p className="sold-out font-bold text-[12px] px-[20px]">
                              Sold Out
                            </p>
                          </div>
                        )}
                        <div className="Icon-Container group-hover/arrivals-card:!inline-flex text-[var(--first-color)] hidden flex-col absolute top-[20px] right-[20px]">
                          <i className="text-[20px] font-bold mb-[8px]">
                            <LuEye />
                          </i>
                          <i className="text-[20px] font-bold mb-[8px]">
                            <FaArrowRightArrowLeft />
                          </i>
                          <i className="text-[20px] font-bold mb-[8px]">
                            <FiHeart
                              className={isWished ? "fill-[red]" : ""}
                              onClick={(e) => handleHeart(e, product?._id)}
                            />
                          </i>
                        </div>
                      </div>
                      <div className="sold flex justify-end items-center text-[15px] text-[var(--title-color)] font-medium ml-[5px]">
                        {product?.sold} sold
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
