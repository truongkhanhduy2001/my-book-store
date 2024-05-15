"use client";
import Link from "next/link";
import "./arrival.css";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
export default function Arrival() {
  const data = [
    {
      title: "Dune",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Anime",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Naruto",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "Drama",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "game",
      price: "100",
      discount: "",
      time: "new",
    },
    {
      title: "game",
      price: "100",
      discount: "",
      time: "new",
    },
  ];

  // Login condition
  const [checkLogin, setCheckLogin] = useState(false);

  // Button Cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Arrivalcart-btn");
    btntocart.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        if (!checkLogin) {
          window.location.href = "/login";
        }
        e.preventDefault();
      });
    });
  }, [checkLogin]);

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
            {data.slice(-6).map((item, index) => {
              const { discount: discount, price: price, time } = item;
              const per = (
                ((Number(discount) - Number(price)) / Number(price)) *
                100
              ).toFixed(0);
              return (
                <Link
                  key={index}
                  href="/productDetail"
                  className="arrivals-card h-[100%] !flex relative p-[10px] mt-[16px] bg-[var(--card-color)] border-[2px] border-solid border-[var(--border-color)] rounded-[5px] cursor-pointer transition-transform duration-[100ms] ease hover:border-[var(--first-color)] hover:transition hover:duration-[100ms] hover:ease"
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
                      className="!relative duration-[300ms]"
                      src="/images/biasach1.png"
                      alt="Main Image"
                      fill
                      priority={true}
                      sizes="(max-with: 768px)100vw"
                    />
                  </div>
                  <div className="arrivals-tag">
                    <h2 className="mt-[20px] mb-[12px] text-[var(--title-color)] font-bold text-[16px]">
                      {item.title}
                    </h2>
                    <div className="Arrivalwriter text-[var(--text-color)] text-[16px]">
                      John Deo
                    </div>
                    <div className="Arrivalcategories text-[var(--second-color)] mt-[8px] text-[16px]">
                      Thriller, Horror, Romance
                    </div>
                    <div className="Arrivalbook-price mt-[8px] mb-[15px]">
                      {item.discount != "" && (
                        <h4
                          className="text-[16px] text-[var(--title-color)] font-normal"
                          style={{
                            textDecoration: "none",
                            color: "hsl(230, 70%, 16%)",
                            fontWeight: "bold",
                            marginRight: "8px",
                          }}
                        >
                          ${item.discount}
                        </h4>
                      )}
                      <h3
                        className="text-[var(--title-color)] text-[16px] font-bold"
                        style={
                          item.discount != ""
                            ? {
                                textDecoration: "line-through",
                                color: "hsl(230, 16%, 45%)",
                                fontWeight: "400",
                              }
                            : { textDecoration: "none" }
                        }
                      >
                        ${item.price}
                      </h3>

                      {item.discount != "" && (
                        <span className="sale text-[14px] border-[1px] border-solid bg-[var(--first-color)] text-[var(--white-color)] rounded-[5px]">
                          -{per}%
                        </span>
                      )}
                    </div>
                    <div className="Arrivalcart-btn text-[12px] inline-block text-center font-bold p-[5px] border-[3px] border-solid border-[var(--first-color)] rounded-[5px] relative text-[var(--first-color)] z-[1] hover:bg-[var(--first-color)] transition duration-[300ms] tracking-[2px]">
                      <i className="text-[12px] absolute top-[48.5%] left-[15%] translate-x-[-50%] translate-y-[-50%] duration-[250ms]">
                        <FaShoppingCart />
                      </i>
                      <p className="add-cart font-bold text-[12px] ml-[30px] text-[var(--first-color)] duration-[250ms]">
                        Add cart
                      </p>
                    </div>
                    <div className="Icon-Container text-[var(--first-color)] hidden flex-col absolute top-[20px] right-[20px]">
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
