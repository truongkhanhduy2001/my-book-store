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
    <section className="section-p1" id="bestseller">
      <div className="section-p1-container">
        <h2>Best Seller</h2>
        <Link href="/sellerPage" style={{ display: "inline-block" }}>
          <h3>View all</h3>
        </Link>
      </div>
      <div className="best-seller-container">
        <div className="best-seller">
          <div className="best-seller-box slider-container">
            <Slider {...settings}>
              {data.slice(-4).map((item, index) => {
                const { discount: discount, price: price, time } = item;
                const per = (
                  ((Number(discount) - Number(price)) / Number(price)) *
                  100
                ).toFixed(0);
                return (
                  <Link key={index} href="#" className="best-seller-card">
                    {time == "new" && (
                      <div className="best-seller-label">
                        <span className="new">NEW</span>
                      </div>
                    )}
                    <div className="best-seller-img">
                      <Image
                        src="/images/biasach1.png"
                        alt="Main Image"
                        width={100}
                        height={100}
                        priority={true}
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                        }}
                      />
                    </div>
                    <div className="best-seller-tag">
                      <h2>{item.title}</h2>
                      <div className="Sellerwriter">John Deo</div>
                      <div className="Sellercategories">
                        Thriller, Horror, Romance
                      </div>
                      <div className="Sellerbook-price">
                        {item.discount != "" && (
                          <h4
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
                          <span className="sale">-{per}%</span>
                        )}
                      </div>
                      <div className="Sellercart-btn">
                        <i>
                          <FaShoppingCart />
                        </i>
                        <p className="add-cart">Add cart</p>
                      </div>
                      <div className="Icon-Container">
                        <i>
                          <LuEye />
                        </i>
                        <i>
                          <FaArrowRightArrowLeft />
                        </i>
                        <i>
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
