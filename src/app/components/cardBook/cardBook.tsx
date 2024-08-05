"use client";
import Link from "next/link";
import Image from "next/image";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "./cardBook.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useCustomContext } from "@/provider/CustomProvider";
import { useWishContext } from "@/provider/WishProvider";
import { useCartContext } from "@/provider/CartProvider";

export default function CardBook(props: any) {
  const router = useRouter();
  const { product, per, averageRating } = props;
  const { user } = useCustomContext();
  const { wish, getWish } = useWishContext();
  const { cart, getCart } = useCartContext();

  // Button cart
  const handleCart = async (e: any) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    if (product.stock === 0) {
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
          productId: product?._id,
          quantity: 1,
          price: product.discount > 0 ? product.discount : product.price,
          totalPrice: product.price * 1,
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
  const handleHeart = async (e: any) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      fetch("/api/wish/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          productId: product?._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            getWish();
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  // Get wish
  const [wishList, setWishList] = useState({}) as any;

  useEffect(() => {
    if (wish) {
      const initialWishList: any = {};
      wish.listWish.forEach((item: any) => {
        initialWishList[item.productId?._id] = true;
      });
      setWishList(initialWishList);
    }
  }, [wish]);

  const isWished = wishList[product?._id];

  return (
    <>
      <Link
        href={{
          pathname: "/productDetail",
          query: { id: product._id },
        }}
        className="template-card group/template-card relative text-center p-[10px] mt-[16px] bg-[var(--card-color)] rounded-[5px] border-solid border-[2px] border-[var(--border-color)] cursor-pointer transition-transform duration-[100ms] ease hover:border-[var(--first-color)] hover:transition hover:duration-[100ms] hover:ease"
      >
        {product?.time == "new" && (
          <div className="template-label absolute top-[10%] left-[27%] z-[1] bg-[var(--first-color)] rounded-[5px] translate-x-[-50%] translate-y-[-50%]">
            <span className="new text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
              NEW
            </span>
          </div>
        )}
        {product?.stock == 0 && (
          <div className="arrivals-label absolute top-[20%] left-[26%] translate-x-[-50%] translate-y-[-50%] z-[1] bg-[red] rounded-[5px]">
            <span className="sold-out text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
              SOLD OUT
            </span>
          </div>
        )}

        <div className="template-img !relative w-[150px] h-[220px] mt-0 mb-0 ml-[auto] mr-[auto] cursor-pointer overflow-hidden shadow-[0_0_8px_var(--title-color)]">
          <Image
            className="!relative duration-[300ms] group-hover/template-card:scale-110"
            src={product?.image}
            alt="Main Image"
            fill
            priority={true}
            sizes="(max-with: 768px)100vw"
          />
        </div>
        <div className="template-tag">
          <h2 className="mt-[12px] mb-[12px] text-[var(--title-color)] font-bold text-[16px]">
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
              ({product.reviews ? product.reviews.length : 0} reviews)
            </span>
          </div>
          <div className="template-writer text-[var(--text-color)] text-[16px]">
            {product?.author}
          </div>
          <div className="template-categories text-[var(--second-color)] text-[16px] mt-[8px]">
            {product?.genre}
          </div>
          <div className="template-price flex mb-[15px] mt-[8px] justify-center">
            {product?.discount > "0" && (
              <h4
                className="ml-[6px] font-normal text-[16px] text-[var(--title-color)]"
                style={{
                  textDecoration: "none",
                  color: "hsl(230, 70%, 16%)",
                  fontWeight: "bold",
                  marginRight: "8px",
                  marginTop: "2px",
                }}
              >
                ${product?.discount}
              </h4>
            )}
            <h3
              className="text-[var(--title-color)] text-[16px] font-bold"
              style={
                product?.discount > "0"
                  ? {
                      textDecoration: "line-through",
                      color: "hsl(230, 16%, 45%)",
                      fontWeight: "400",
                      marginTop: "2px",
                    }
                  : { textDecoration: "none" }
              }
            >
              ${product?.price}
            </h3>

            {product?.discount > "0" && (
              <span className="sale text-[14px] border border-solid rounded-[5px] bg-[var(--first-color)] text-[var(--white-color)] pt-[2px] pb-[2px] pl-[5px] pr-[5px] ml-[6px]">
                -{per}%
              </span>
            )}
          </div>
          {product?.stock > 0 ? (
            <div
              className="template-btn group/template-btn text-[12px] inline-block text-center font-bold p-[5px] border-[3px] border-solid border-[var(--first-color)] rounded-[5px] relative text-[var(--first-color)] z-[1] tracking-[2px] transition duration-[300ms] hover:bg-[var(--first-color)]"
              onClick={(e) => handleCart(e)}
            >
              <i className="text-[12px] absolute top-[48.5%] left-[15%] translate-x-[-50%] translate-y-[-50%] duration-[250ms] group-hover/template-btn:left-[50%] group-hover/template-btn:text-[var(--white-color)]">
                <FaShoppingCart />
              </i>
              <p className="add-cart font-bold text-[12px] text-[var(--first-color)] ml-[30px] duration-[250ms]">
                Add cart
              </p>
            </div>
          ) : (
            <div className="template-btn text-[12px] inline-block text-center font-bold p-[5px] border-[3px] border-solid border-[red] rounded-[5px] relative text-[red] z-[1] cursor-not-allowed">
              <p className="sold-out text-[12px] font-bold px-[20px]">
                Sold Out
              </p>
            </div>
          )}
          <div className="Icon-Container group-hover/template-card:!inline-flex hidden flex-col absolute text-[var(--first-color)] top-[20px] right-[20px]">
            <i className="text-[20px] font-bold mb-[8px]">
              <LuEye />
            </i>
            <i className="text-[20px] font-bold mb-[8px]">
              <FaArrowRightArrowLeft />
            </i>
            <i className="text-[20px] font-bold mb-[8px]">
              <FiHeart
                className={isWished ? "fill-[red]" : ""}
                onClick={(e) => handleHeart(e)}
              />
            </i>
          </div>
        </div>
        <div className="sold flex justify-end items-center text-[15px] text-[var(--title-color)] font-medium ml-[5px]">
          {product?.sold} sold
        </div>
      </Link>
    </>
  );
}
