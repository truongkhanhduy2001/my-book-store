"use client";
import Link from "next/link";
import "./arrival.css";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { useCustomContext } from "@/provider/CustomProvider";
export default function Arrival() {
  const { user } = useCustomContext();
  const [products, setProducts] = useState(null) as any;

  useEffect(() => {
    const fetchDataArrival = async () => {
      try {
        const res = await fetch("/api/product/arrival");
        const data = await res.json();
        setProducts(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (!products) {
      fetchDataArrival();
    }
  }, [products]);

  // Button Cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Arrivalcart-btn");
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        if (!user) {
          window.location.href = "/login";
        }
        e.preventDefault();
      });
    });
  }, [user]);

  // Icon heart
  const handleHeart = (e: any) => {
    e.target.closest(".HeartIcon").classList.toggle("active");
    e.preventDefault();
  };

  return (
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
        <div className="arrivals max-w-[var(--width-home)] w-[100%]">
          <div className="arrivals-box grid grid-cols-3 gap-[15px]">
            {products?.slice(-6).map((product: any) => {
              const { discount: discount, price: price, time } = product;
              const per = (
                ((Number(discount) - Number(price)) / Number(price)) *
                100
              ).toFixed(0);
              return (
                <Link
                  key={product._id}
                  href="/productDetail"
                  className="arrivals-card group/arrivals-card h-[100%] !flex relative p-[10px] mt-[16px] bg-[var(--card-color)] border-[2px] border-solid border-[var(--border-color)] rounded-[5px] cursor-pointer transition-transform duration-[100ms] ease hover:border-[var(--first-color)] hover:transition hover:duration-[100ms] hover:ease"
                >
                  {time == "new" && (
                    <div className="arrivals-label absolute top-[15%] left-[13%] translate-x-[-50%] translate-y-[-50%] z-[1] bg-[var(--first-color)] rounded-[5px]">
                      <span className="new text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
                        NEW
                      </span>
                    </div>
                  )}
                  <div className="arrivals-img !relative w-[150px] h-[220px] ml-[auto] mr-[auto] cursor-pointer overflow-hidden shadow-[0_0_8px_var(--title-color)]">
                    <Image
                      className="!relative duration-[300ms] group-hover/arrivals-card:scale-110"
                      src={product.image}
                      alt="Main Image"
                      fill
                      priority={true}
                      sizes="(max-with: 768px)100vw"
                    />
                  </div>
                  <div className="arrivals-tag">
                    <h2 className="mt-[20px] mb-[12px] text-[var(--title-color)] font-bold text-[16px]">
                      {product.name}
                    </h2>
                    <div className="Arrivalwriter text-[var(--text-color)] text-[16px]">
                      {product.author}
                    </div>
                    <div className="Arrivalcategories text-[var(--second-color)] mt-[8px] text-[16px]">
                      {product.genre}
                    </div>
                    <div className="Arrivalbook-price mt-[8px] mb-[15px]">
                      {discount > "0" && (
                        <h4
                          className="text-[16px] text-[var(--title-color)] font-normal"
                          style={{
                            textDecoration: "none",
                            color: "hsl(230, 70%, 16%)",
                            fontWeight: "bold",
                            marginRight: "8px",
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
                    <div className="Arrivalcart-btn group/Arrivalcart-btn text-[12px] inline-block text-center font-bold p-[5px] border-[3px] border-solid border-[var(--first-color)] rounded-[5px] relative text-[var(--first-color)] z-[1] hover:bg-[var(--first-color)] transition duration-[300ms] tracking-[2px]">
                      <i className="text-[12px] absolute top-[48.5%] left-[15%] translate-x-[-50%] translate-y-[-50%] duration-[250ms] group-hover/Arrivalcart-btn:left-[50%] group-hover/Arrivalcart-btn:text-[var(--white-color)]">
                        <FaShoppingCart />
                      </i>
                      <p className="add-cart font-bold text-[12px] ml-[30px] text-[var(--first-color)] duration-[250ms]">
                        Add cart
                      </p>
                    </div>
                    <div className="Icon-Container group-hover/arrivals-card:!inline-flex text-[var(--first-color)] hidden flex-col absolute top-[20px] right-[20px]">
                      <i className="text-[20px] font-bold mb-[8px]">
                        <LuEye />
                      </i>
                      <i className="text-[20px] font-bold mb-[8px]">
                        <FaArrowRightArrowLeft />
                      </i>
                      <i className="text-[20px] font-bold mb-[8px]">
                        <FiHeart className="HeartIcon" onClick={handleHeart} />
                      </i>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
