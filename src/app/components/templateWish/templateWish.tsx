"use client";
import Link from "next/link";
import Image from "next/image";
import "./templateWish.css";
import { useState, useEffect, useLayoutEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useCustomContext } from "@/provider/CustomProvider";
import { useWishContext } from "@/provider/WishProvider";
import { useCartContext } from "@/provider/CartProvider";

export default function TemplateWish(props: any) {
  const { item, per } = props;
  const { user } = useCustomContext();
  const { wish, getWish } = useWishContext();
  const { cart, getCart } = useCartContext();

  // Button cart
  const handleCart = async (e: any) => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          productId: item.productId._id,
          quantity: 1,
          price:
            item.productId.discount > 0
              ? item.productId.discount
              : item.productId.price,
          totalPrice: item.productId.price * 1,
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
    if (!user) {
      window.location.href = "/login";
      return;
    }
    e.preventDefault();
    try {
      fetch("/api/wish/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          productId: item.productId._id,
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
  const [wishs, setWishs] = useState(false);

  useEffect(() => {
    if (wish) {
      const checkwish = wish.listWish.some(
        (value: any) => value.productId._id === item.productId._id
      );
      setWishs(checkwish);
    }
  }, [wish, item.productId._id]);

  return (
    <>
      <Link
        href={{
          pathname: "/productDetail",
          query: { id: item.productId._id },
        }}
        className="template-card group/template-card relative text-center p-[10px] mt-[16px] bg-[var(--card-color)] rounded-[5px] border-solid border-[2px] border-[var(--border-color)] cursor-pointer transition-transform duration-[100ms] ease hover:border-[var(--first-color)] hover:transition hover:duration-[100ms] hover:ease"
      >
        {item?.productId.time == "new" && (
          <div className="template-label absolute top-[10%] left-[27%] z-[1] bg-[var(--first-color)] rounded-[5px] translate-x-[-50%] translate-y-[-50%]">
            <span className="new text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
              NEW
            </span>
          </div>
        )}
        {item?.productId.stock == 0 && (
          <div className="arrivals-label absolute top-[20%] left-[26%] translate-x-[-50%] translate-y-[-50%] z-[1] bg-[red] rounded-[5px]">
            <span className="sold-out text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
              SOLD OUT
            </span>
          </div>
        )}

        <div className="template-img !relative w-[150px] h-[220px] mt-0 mb-0 ml-[auto] mr-[auto] cursor-pointer overflow-hidden shadow-[0_0_8px_var(--title-color)]">
          <Image
            className="!relative duration-[300ms] group-hover/template-card:scale-110"
            src={item?.productId.image}
            alt="Main Image"
            fill
            priority={true}
            sizes="(max-with: 768px)100vw"
          />
        </div>
        <div className="template-tag">
          <h2 className="mt-[12px] mb-[12px] text-[var(--title-color)] font-bold text-[16px]">
            {item?.productId.name}
          </h2>
          <div className="template-writer text-[var(--text-color)] text-[16px]">
            {item?.productId.writer}
          </div>
          <div className="template-categories text-[var(--second-color)] text-[16px] mt-[8px]">
            {item?.productId.genre}
          </div>
          <div className="template-price flex mb-[15px] mt-[8px] justify-center">
            {item?.productId.discount > "0" && (
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
                ${item?.productId.discount}
              </h4>
            )}
            <h3
              className="text-[var(--title-color)] text-[16px] font-bold"
              style={
                item?.productId.discount > "0"
                  ? {
                      textDecoration: "line-through",
                      color: "hsl(230, 16%, 45%)",
                      fontWeight: "400",
                      marginTop: "2px",
                    }
                  : { textDecoration: "none" }
              }
            >
              ${item?.productId.price}
            </h3>

            {item?.productId.discount > "0" && (
              <span className="sale text-[14px] border border-solid rounded-[5px] bg-[var(--first-color)] text-[var(--white-color)] pt-[2px] pb-[2px] pl-[5px] pr-[5px] ml-[6px]">
                -{per}%
              </span>
            )}
          </div>
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
          <div className="Icon-Container group-hover/template-card:!inline-flex hidden flex-col absolute text-[var(--first-color)] top-[20px] right-[20px]">
            <i className="text-[20px] font-bold mb-[8px]">
              <LuEye />
            </i>
            <i className="text-[20px] font-bold mb-[8px]">
              <FaArrowRightArrowLeft />
            </i>
            <i className="text-[20px] font-bold mb-[8px]">
              <FiHeart
                className={wishs ? "fill-[red]" : ""}
                onClick={(e) => handleHeart(e)}
              />
            </i>
          </div>
        </div>
      </Link>
    </>
  );
}
