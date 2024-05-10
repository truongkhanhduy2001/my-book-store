"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import "./seller.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LuEye } from "react-icons/lu";
import { FiHeart } from "react-icons/fi";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
export default function Seller() {
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
      discount: "60",
      time: "old",
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
      discount: "67",
      time: "old",
    },
  ];

  // Login condition
  const [checkLogin, setCheckLogin] = useState(false);

  // Button Cart
  useEffect(() => {
    const btntocart = document.querySelectorAll(".Sellercart-btn");
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

  // Slider
  function NextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <i onClick={onClick} className={className}>
        <IoIosArrowForward />
      </i>
    );
  }
  function PrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <i onClick={onClick} className={className}>
        <IoIosArrowBack />
      </i>
    );
  }
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section
      className="section-p1 flex flex-col mt-[var(--margin-top)]"
      id="bestseller"
    >
      <div className="section-p1-container max-w-[var(--width-home)] w-[100%] m-[auto] flex justify-between">
        <h2 className="text-[25px] text-[var(--title-color)] font-bold">
          Best Seller
        </h2>
        <Link href="/sellerPage" style={{ display: "inline-block" }}>
          <h3 className="text-[18px] mt-[5px] text-[var(--text-color)] hover:text-[var(--first-color)]">
            View all
          </h3>
        </Link>
      </div>
      <div className="best-seller-container flex justify-center mt-[var(--margin-top-font)]">
        <div className="best-seller max-w-[var(--width-home)] w-[100%]">
          <div className="best-seller-box slider-container">
            <Slider {...settings}>
              {data.slice(-4).map((item, index) => {
                const { discount: discount, price: price, time } = item;
                const per = (
                  ((Number(discount) - Number(price)) / Number(price)) *
                  100
                ).toFixed(0);
                return (
                  <Link
                    key={index}
                    href="/productDetail"
                    className="best-seller-card relative text-center p-[10px] mt-[16px] bg-[var(--card-color)] rounded-[5px] cursor-pointer border-[2px] border-solid border-[var(--border-color)] hover:border-[var(--first-color)]"
                  >
                    {time == "new" && (
                      <div className="best-seller-label absolute top-[10%] left-[27%] z-[1] translate-x-[-50%] translate-y-[-50%] bg-[var(--first-color)] rounded-[5px]">
                        <span className="new text-[12px] pt-[2px] pb-[2px] pl-[10px] pr-[10px]">
                          NEW
                        </span>
                      </div>
                    )}
                    <div className="best-seller-img !relative w-[150px] h-[220px] ml-[auto] mr-[auto] cursor-pointer overflow-hidden shadow-[0_0_8px_var(--title-color)]">
                      <Image
                        className="!relative duration-[300ms]"
                        src="/images/biasach1.png"
                        alt="Main Image"
                        fill
                        priority={true}
                        sizes="(max-with: 768px)100vw"
                      />
                    </div>
                    <div className="best-seller-tag">
                      <h2 className="mt-[12px] mb-[12px] text-[var(--title-color)] font-bold text-[16px]">
                        {item.title}
                      </h2>
                      <div className="Sellerwriter text-[var(--text-color)] text-[16px]">
                        John Deo
                      </div>
                      <div className="Sellercategories text-[var(--second-color)] text-[16px] mt-[16px]">
                        Thriller, Horror, Romance
                      </div>
                      <div className="Sellerbook-price mt-[8px] mb-[15px] flex justify-center">
                        {item.discount != "" && (
                          <h4
                            className="text-[var(--title-color)] text-[16px] font-normal ml-[6px]"
                            style={{
                              textDecoration: "none",
                              color: "hsl(230, 70%, 16%)",
                              fontWeight: "bold",
                              marginRight: "8px",
                              marginTop: "2px",
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
                                  marginTop: "2px",
                                }
                              : { textDecoration: "none" }
                          }
                        >
                          ${item.price}
                        </h3>

                        {item.discount != "" && (
                          <span className="sale text-[14px] border border-solid bg-[var(--first-color)] text-[var(--white-color)] pt-[2px] pb-[2px] pl-[5px] pr-[5px] rounded-[5px] ml-[6px]">
                            -{per}%
                          </span>
                        )}
                      </div>
                      <div className="Sellercart-btn text-[12px] text-[var(--first-color)] inline-block text-center font-bold border-[3px] border-solid border-[var(--first-color)] p-[5px] rounded-[5px] relative z-[1] tracking-[2px] transition duration-[300ms] hover:bg-[var(--first-color)]">
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
                          <FiHeart
                            className="HeartIcon"
                            onClick={handleHeart}
                          />
                        </i>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
